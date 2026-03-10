# react-native-multiple-modals
# Keep all classes in the library's package to prevent R8/ProGuard
# from stripping or renaming them during minification.
-keep class com.multiplemodals.** { *; }
-keepnames class com.multiplemodals.** { *; }
