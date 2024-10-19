# react-native-multiple-modals

The main goal of this library is to provide a component that allows to display multiple modals at the same time.

No additional props to manage StatusBar or SafeArea. I try to make the ModalView component as lightweight as possible. It solves one problem - shows a modal. Everything else is the task of other components.

## ✨ Features

- 📱 iOS & Android
- 🚀 Performant Native Implementation
- ✅ Accessibility Support
- 💯 Compatible with Expo

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

Styles of the content wrapper.

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

## Roadmap

[ ] New Architecture support
