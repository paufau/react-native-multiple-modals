import { execSync } from "child_process";
import fs from "fs";
import * as Jimp from "jimp";
import yaml from "js-yaml";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Minimal logger (inlined from the old examples repo's utils.js).
class Logger {
  isVerbose = false;

  log(message) {
    if (this.isVerbose) {
      console.log(message);
    }
  }

  raiseException(...message) {
    console.error(...message);
    process.exit(1);
  }
}

// Constants
const SCREENSHOTS_PATH = './e2e/screenshots/';
const EXPECTED_SCREENSHOTS_PATH = './e2e/expected-screenshots/';
const GENERATED_FLOW_NAME = "generated_flow.yaml";

// Initialize logger
const logger = new Logger();
logger.isVerbose = true;

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option('platform', {
    demandOption: true,
    describe: 'Specify the platform for the build',
    type: 'string',
    choices: ['ios', 'android'],
  })
  .option('architecture', {
    alias: 'arch',
    describe: 'Architecture label used in screenshot names',
    choices: ['new', 'old'],
    default: 'new'
  })
  .option('device', {
    describe: 'Device UDID/serial to run on (defaults to the booted one)',
    type: 'string',
  })
  .option('device-label', {
    describe: 'Stable label used in screenshot file names (keeps committed baselines reproducible across machines). Defaults to the platform.',
    type: 'string',
  })
  .option('run-steps', {
    alias: 'steps',
    describe: 'Run specific steps in the E2E process',
    type: 'array',
    choices: ['generation', 'tests', 'images'],
    default: ['generation', 'tests', 'images']
  })
  .option('update-screenshots', {
    alias: 'u',
    describe: 'Update the expected screenshots with the current ones',
    type: 'boolean',
    default: false
  })
  .option('silent', {
    alias: 's',
    describe: 'Enable silent output',
    type: 'boolean',
    default: false
  })
  .help()
  .alias('help', 'h')
  .parse();

// Setup variables
const { platform, architecture, runSteps, silent, updateScreenshots, device: specificDevice, deviceLabel } = argv;

logger.isVerbose = !silent;

// App id comes from the Expo config (single example app), not a per-project derivation.
const appConfig = JSON.parse(fs.readFileSync('./app.json', 'utf8'));
const appId = platform === 'ios'
  ? appConfig.expo.ios.bundleIdentifier
  : appConfig.expo.android.package;

const modalsConfig = JSON.parse(fs.readFileSync('./demo-components/src/modals.config.json', 'utf8'));

const generatedFlowPath = path.join(process.cwd(), 'e2e', 'flows', GENERATED_FLOW_NAME);
const baseFlowPath = path.join(process.cwd(), 'e2e', 'flows', 'base.yaml');

const getBootedDevice = () => {
  if (specificDevice) {
    return specificDevice;
  }

  if (platform === 'ios') {
    const devices = execSync('xcrun simctl list devices booted', { encoding: 'utf8' });
    const bootedDevice = devices.match(/\(([A-F0-9\-]+)\)\s+\(Booted\)/);
    return bootedDevice ? bootedDevice[1] : null;
  } else if (platform === 'android') {
    const devices = execSync('adb devices', { encoding: 'utf8' });
    const bootedDevice = devices.match(/(emulator-\d+)\s+device/);
    return bootedDevice ? bootedDevice[1] : null;
  }
}

const device = getBootedDevice();
// Screenshots are keyed by a stable label, not the device UDID, so baselines stay reproducible
// across machines. Pin the same simulator/emulator model when (re)generating expected screenshots.
const screenshotDevice = deviceLabel || platform;

// Generate flow configurations for E2E tests
const generateFlowConfigs = () => {
  const flowConfigs = [];

  modalsConfig.modals.forEach(modalConfig => {
    modalConfig.e2e.scenarios.forEach(scenario => {
      const testFileName = `${scenario}.yaml`;

      const flowConfig = {
        runFlow: {
          file: testFileName,
          env: {
            APP_ID: appId,
            MODAL_ID: modalConfig.id,
            SCREENSHOTS_PATH,
            DEVICE: screenshotDevice,
            ARCHITECTURE: architecture
          }
        }
      };

      flowConfigs.push(flowConfig);
    });
  });

  return flowConfigs;
};

// Generate the combined flow file
const generateFlow = () => {
  const baseFlowString = fs.readFileSync(baseFlowPath, { encoding: 'utf8' });
  const generatedFlowContent = `${baseFlowString}\n${yaml.dump(generateFlowConfigs(), { indent: 2 })}`;

  fs.mkdirSync(path.dirname(generatedFlowPath), { recursive: true });
  fs.writeFileSync(generatedFlowPath, generatedFlowContent, { encoding: 'utf8' });
};

// Run E2E tests using Maestro
const runE2ETests = () => {
  if (!device) {
    logger.raiseException(`No booted ${platform} device found. Boot a simulator/emulator (or pass --device) before running e2e.`);
  }

  logger.log(`Running E2E tests for app ${appId} on device: ${device}`);

  // Freeze the status bar so screenshots are deterministic across runs (clock, battery, signal).
  if (platform === 'ios') {
    execSync(`xcrun simctl status_bar ${device} override --time "9:41" --batteryState charged --batteryLevel 100 --cellularMode active --cellularBars 4 --dataNetwork wifi --wifiMode active --wifiBars 3`, { stdio: 'ignore' });
  } else if (platform === 'android') {
    // Android SystemUI demo mode: fixed clock/battery/signal.
    const demo = (args) => execSync(`adb -s ${device} shell am broadcast -a com.android.systemui.demo ${args}`, { stdio: 'ignore' });
    execSync(`adb -s ${device} shell settings put global sysui_demo_allowed 1`, { stdio: 'ignore' });
    demo('-e command clock -e hhmm 0941');
    demo('-e command battery -e level 100 -e plugged false');
    demo('-e command network -e wifi show -e level 4');
    demo('-e command network -e mobile show -e datatype none -e level 4');
    demo('-e command notifications -e visible false');
  }

  try {
    execSync(`maestro --device ${device} test ${generatedFlowPath} -e APP_ID=${appId}`, { stdio: 'inherit' });
    logger.log('E2E tests completed successfully.');
  } catch (error) {
    logger.raiseException('E2E tests failed:', error.message);
  }
};

// Compare two images with extremely strict criteria
const compareImages = async (actualPath, expectedPath, imageName) => {
  try {
    const actualImage = await Jimp.Jimp.read(actualPath);
    const expectedImage = await Jimp.Jimp.read(expectedPath);

    const distance = Jimp.distance(actualImage, expectedImage);
    const pixelDiff = Jimp.diff(actualImage, expectedImage);

    // ponytail: 5% pixel-diff tolerance absorbs sub-pixel animation/AA noise from the
    // animated see-through modals (slide/spring bottom sheets) — observed run-to-run noise
    // is ~3%. `distance` (average color) stays strict to catch real color/content changes.
    // Tighten toward 0.001 if every screenshot is captured on fully static content.
    const isMatch = distance <= 0.02 && pixelDiff.percent <= 0.05;

    if (isMatch) {
      logger.log(`✅ Screenshot ${imageName} matches expected (distance: ${distance.toFixed(6)}, diff: ${(pixelDiff.percent * 100).toFixed(4)}%)`);
    } else {
      // Log, don't exit: keep comparing so every mismatch is reported (runImageComparison exits at the end).
      console.error(`❌ Screenshot ${imageName} does not match expected (distance: ${distance.toFixed(6)}, diff: ${(pixelDiff.percent * 100).toFixed(4)}%)`);
    }

    return isMatch;
  } catch (error) {
    logger.raiseException(`❌ Error comparing images for ${imageName}:`, error.message);
    return false;
  }
};

// Compare all screenshots with their expected versions
const runImageComparison = async () => {
  if (!fs.existsSync(SCREENSHOTS_PATH)) {
    logger.raiseException(`No screenshots were produced at ${SCREENSHOTS_PATH}. Did the Maestro flow run and take screenshots?`);
  }

  if (updateScreenshots) {
    // Move screenshots to expected-screenshots
    logger.log('Updating expected screenshots...');
    fs.mkdirSync(EXPECTED_SCREENSHOTS_PATH, { recursive: true });
    const screenshots = fs.readdirSync(SCREENSHOTS_PATH);
    screenshots.forEach(screenshot => {
      const src = path.join(SCREENSHOTS_PATH, screenshot);
      const dest = path.join(EXPECTED_SCREENSHOTS_PATH, screenshot);
      fs.copyFileSync(src, dest);
    });
    logger.log('Screenshots copied to expected-screenshots.');
    return;
  }

  const screenshots = fs.readdirSync(SCREENSHOTS_PATH);
  let allMatched = true;

  for (const screenshot of screenshots) {
    const expectedScreenshotPath = path.join(EXPECTED_SCREENSHOTS_PATH, screenshot);
    const actualScreenshotPath = path.join(SCREENSHOTS_PATH, screenshot);

    if (fs.existsSync(expectedScreenshotPath)) {
      const matched = await compareImages(actualScreenshotPath, expectedScreenshotPath, screenshot);
      if (!matched) allMatched = false;
    } else {
      console.warn(`⚠️  Expected screenshot ${screenshot} not found.`);
      allMatched = false;
    }
  }

  if (allMatched) {
    logger.log('\n🎉 All screenshots match the expected results!');
  } else {
    logger.log('\n❌ Some screenshots do not match the expected results.');
    process.exit(1);
  }
};

const cleanScreenshots = () => {
  if (fs.existsSync(SCREENSHOTS_PATH)) {
    fs.rmSync(SCREENSHOTS_PATH, { recursive: true, force: true });
    logger.log('Cleaned up screenshots folder.');
  }
};

// Main execution
cleanScreenshots();

if (runSteps.includes('generation')) {
  generateFlow();
}
if (runSteps.includes('tests')) {
  runE2ETests();
}
if (runSteps.includes('images')) {
  runImageComparison();
}
