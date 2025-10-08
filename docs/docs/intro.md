---
sidebar_position: 1
slug: /intro
---

# Introduction

[![NPM Version](https://img.shields.io/npm/v/react-native-multiple-modals)](https://www.npmjs.com/package/react-native-multiple-modals)
![Static Badge](https://img.shields.io/badge/types-included-81B622)
![Static Badge](https://img.shields.io/badge/platforms-iOS%2C_Android%2C_Web-7a34eb)
[![NPM Downloads](https://img.shields.io/npm/dm/react-native-multiple-modals)](https://www.npmjs.com/package/react-native-multiple-modals)

**React Native Multiple Modals** is a Native Modal implementation which allows to display multiple Modals simultaneously.

## ✨ Features

- 🚀 **Multiple Instances** - Shows multiple modal instances at the same time
- 💯 **Displays on top** - Works on top of default React Native modal
- 🆗 **Gesture Handler Support** - Supports gesture handler out of the box
- 🛠️ **Bottom Tabs Navigation** - Displays above bottom tabs navigation
- 📱 **Rotation Support** - Adjusts content when device is rotated
- 💥 **Enhanced Status Bar** - Enhanced status bar configuration
- ✅ **Accessibility** - Built-in accessibility support
- 🌐 **Web Support** - Works on web platforms

## Why Use This Library?

React Native's built-in Modal component doesn't support displaying multiple modals simultaneously. This library solves that problem by providing a native implementation that allows you to:

- Stack multiple modals on top of each other
- Show modals from different parts of your app simultaneously
- Have better control over modal presentation and dismissal
- Maintain performance with native implementations

## Quick Example

```tsx
import { ModalView } from 'react-native-multiple-modals';

const YourComponent = () => {
  const [isVisible, setVisibility] = useState(false);

  return (
    <View>
      <Button text='Open modal' onPress={() => setVisibility(true)} />
      {isVisible && (
        <ModalView
          animationType='fade'
          onRequestDismiss={() => setVisibility(false)}
        >
          <YourContentView />
        </ModalView>
      )}
    </View>
  );
};
```

## Platform Support

This library supports:
- ✅ iOS (old and new architecture)
- ✅ Android (old and new architecture)  
- ✅ Web

## Getting Started

Head over to the [Installation](./installation.md) guide to get started!
