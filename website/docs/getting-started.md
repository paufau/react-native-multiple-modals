---
slug: /
sidebar_position: 1
title: Getting Started
description: Native Modal implementation for React Native that displays multiple modals simultaneously on iOS, Android and Web.
---

# React Native Multiple Modals

Native Modal implementation which allows to display multiple Modals simultaneously.

![React Native Multiple Modals](../../assets/preview.gif)

## Features

- 🚀 Shows multiple instances at the same time
- 💯 Displays on top of default modal
- 🆗 Supports gesture handler out of the box
- 🛠️ Displays above bottom tabs navigation
- 📱 Adjusts content when rotated
- 💥 Enhanced status bar configuration
- ✅ Accessibility Support

## Installation

```bash
npm i react-native-multiple-modals
```

```bash
yarn add react-native-multiple-modals
```

### iOS

```bash
pod install --project-directory=ios
```

## Usage

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
          statusBar={{ translucent: true, barStyle: 'dark-content' }}
          backdropColor='rgba(0,0,0,0.5)'
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onRequestDismiss={() => setVisibility(false)}
        >
          <YourContentView />
        </ModalView>
      )}
    </View>
  );
};
```

More examples: [example/demo-components](https://github.com/paufau/react-native-multiple-modals/tree/main/example/demo-components/src/modals)
