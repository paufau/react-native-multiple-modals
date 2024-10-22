# react-native-multiple-modals

Native Modal implementation which allows to display multiple Modals simultaneously.

## ✨ Features

- 📱 iOS & Android
- 🚀 Performant Native Implementation
- ✅ Accessibility Support
- 💯 Compatible with Expo
- 💥 New Architecture
  - 🛠️ iOS - Migration Started
  - ⌛ Android - Planned

## Installation

```bash
npm i react-native-multiple-modals
```

or

```bash
yarn add react-native-multiple-modals
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
        <ModalView onRequestClose={() => setVisibility(false)}>
          <YourContentView />
        </ModalView>
      )}
    </View>
  );
};
```

## Properties

### `contentContainerStyle?: ViewStyle`

Styles of the content wrapper. Use it for aligning your content view.

---

### `onRequestClose?: (calledBy: 'Backdrop' | 'BackButton') => void`

The method is called when backdrop or back button is pressed

> _**TIP**_: If you want the modal to block the interface and not close when user taps the backdrop or back button. Then just don't pass this function. The modal will be rendered until you remove it from the React tree.

---

### `backdropProps?: PressableProps`

For fine-tuning of the default backdrop

---

### `renderBackdrop?: () => ReactNode`

When backdropProps are no longer enough.

> _**NOTE**_: While rendering custom backdrop `onRequestClose` is not called, so you should handle backdrop press by yourself

---
