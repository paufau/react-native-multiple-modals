module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Reanimated v4 uses the worklets plugin (must be listed last).
    plugins: ['react-native-worklets/plugin'],
  };
};
