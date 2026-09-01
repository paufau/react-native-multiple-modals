# E2E tests (Maestro + screenshot regression)

Screenshot-based e2e tests for the demo app. For every modal in
`demo-components/src/modals.config.json` that declares an `e2e.scenarios` entry, the runner opens
the modal, asserts it is visible, takes a screenshot, dismisses it, and diffs the screenshot against
a committed baseline in `expected-screenshots/`.

## Prerequisites

1. Maestro CLI (installed separately, not via npm):
   ```sh
   curl -Ls "https://get.maestro.mobile.dev" | bash
   ```
2. Build and install the app on a booted simulator/emulator. From `example/`:
   ```sh
   npx expo prebuild --clean
   npx expo run:ios      # or: npx expo run:android
   ```
   Bundle id / package must be `com.multiplemodals.example` (from `app.json`).
3. Pin one emulator model when generating baselines. Screenshot pixels depend on the
   device model, OS version, and scale, so regenerate baselines on the same model.

## Usage (run from `example/`)

Generate/refresh baselines:

```sh
npm run e2e:run -- --platform ios --update-screenshots
```

Run the comparison (exit code 1 on any mismatch):

```sh
npm run e2e:run -- --platform ios
```

Useful flags:

- `--architecture new|old` (label in the screenshot name)
- `--device <udid/serial>` (defaults to the booted device)
- `--device-label <name>` (stable label in screenshot file names)
- `--run-steps generation tests images`,
- `--silent`
