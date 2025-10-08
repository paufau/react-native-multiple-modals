---
sidebar_position: 2
---

# Installation

## Prerequisites

Before installing, make sure you have:
- React Native version 0.71.0 or higher
- React version 18 or higher

## Using npm

```bash
npm i react-native-multiple-modals
```

## Using yarn

```bash
yarn add react-native-multiple-modals
```

## iOS Setup

After installing the package, you need to install the iOS native dependencies:

```bash
pod install --project-directory=ios
```

Or if you're in your iOS directory:

```bash
cd ios
pod install
cd ..
```

## Android Setup

For Android, the native dependencies are automatically linked. No additional setup is required.

## Web Setup

For web projects, make sure you have `react-dom` installed:

```bash
npm i react-dom
```

or

```bash
yarn add react-dom
```

## Verifying Installation

To verify that the installation was successful, try importing the component in your code:

```tsx
import { ModalView } from 'react-native-multiple-modals';
```

If no errors appear, you're ready to start using the library!

## Next Steps

Check out the [Usage](./usage.md) guide to learn how to use the library in your application.
