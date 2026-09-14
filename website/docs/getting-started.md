---
slug: /getting-started
sidebar_position: 2
title: Getting Started
description: Install react-native-multiple-modals and show your first ModalView on iOS, Android and Web.
---

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

`ModalView` is shown while it is mounted. And hidden when it is removed from the React tree. Pass [`onRequestDismiss`](./api.mdx#onRequestDismiss) to react to backdrop taps and/or the back button presses

```tsx
import { ModalView } from "react-native-multiple-modals";

const YourComponent = () => {
  const [isVisible, setVisibility] = useState(false);

  return (
    <View>
      <Button text="Open modal" onPress={() => setVisibility(true)} />
      {isVisible && (
        <ModalView
          animationType="fade"
          onRequestDismiss={() => setVisibility(false)}
        >
          <YourContentView />
        </ModalView>
      )}
    </View>
  );
};
```

## More examples

The [example app](https://github.com/paufau/react-native-multiple-modals/tree/main/example/demo-components/src/modals) covers more scenarios
