const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const libraryRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [libraryRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(libraryRoot, 'node_modules'),
];

// Prevent the library root's copies of react/react-native from being bundled
// to avoid duplicate React instances (the library source resolves these from
// ../../node_modules/ instead of the app's node_modules/).
const escape = (s) => s.replace(/[/\\]/g, '[/\\\\]');
config.resolver.blockList = [
  new RegExp(escape(path.resolve(libraryRoot, 'node_modules/react/'))),
  new RegExp(escape(path.resolve(libraryRoot, 'node_modules/react-native/'))),
];

// Force singleton packages to resolve from the app's node_modules
config.resolver.extraNodeModules = {
  'react-native-multiple-modals': libraryRoot,
  react: path.resolve(projectRoot, 'node_modules/react'),
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
};

module.exports = config;
