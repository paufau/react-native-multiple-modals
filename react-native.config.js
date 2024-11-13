module.exports = {
  dependency: {
    platforms: {
      android: {
        libraryName: "multiplemodals",
        componentDescriptors: ['RNTModalViewComponentDescriptor'],
        cmakeListsPath: "../android/src/main/jni/CMakeLists.txt"
      },
    },
  },
};