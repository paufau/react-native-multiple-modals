// Metro config for the in-repo example.
// Consumes the library straight from its TypeScript source (`../src`) and forces a
// single copy of the library's peer deps from example/node_modules, blocking the
// root's stale react-native / react copies (kept there for codegen/typecheck).
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const pak = require('../package.json');

const escapeRegExp = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const projectRoot = __dirname;
const root = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [projectRoot, path.resolve(root, 'src')];

config.resolver.extraNodeModules = {};

// Force the library's peer deps to resolve from the example's node_modules, and
// block the root copies so imports originating in `../src` don't pick up the
// stale root react-native/react while walking up the tree.
const modules = Object.keys({ ...pak.peerDependencies });
modules.forEach(name => {
  config.resolver.extraNodeModules[name] = path.resolve(
    projectRoot,
    'node_modules',
    name,
  );
});

const blocks = modules.map(
  m =>
    new RegExp(`^${escapeRegExp(path.resolve(root, 'node_modules', m))}\\/.*$`),
);
const existing = config.resolver.blockList;
config.resolver.blockList = [
  ...(Array.isArray(existing) ? existing : existing ? [existing] : []),
  ...blocks,
];

const libName = pak.name;
const libSrc = path.resolve(root, 'src');
const libPrefix = `${libName}/`;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === libName || moduleName.startsWith(libPrefix)) {
    const rest = moduleName.slice(libName.length);
    return context.resolveRequest(
      context,
      path.join(libSrc, rest || 'index'),
      platform,
    );
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
