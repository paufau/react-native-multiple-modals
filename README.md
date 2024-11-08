# React Native Multiple Modals

[![NPM Version](https://img.shields.io/npm/v/react-native-multiple-modals)](https://www.npmjs.com/package/react-native-multiple-modals)

Native Modal implementation which allows to display multiple Modals simultaneously.

![React Native Multiple Modals](./assets/preview.gif)

## ✨ Features

- 📱 iOS & Android
- 🚀 Performant Native Implementation
- ✅ Accessibility Support
- 💯 Compatible with Expo
- 💥 New Architecture (Fabric)
- 🆗 Old Architecture (Paper)
- 👌 Written in TypeScript

## Installation

```bash
npm i react-native-multiple-modals
```

or

```bash
yarn add react-native-multiple-modals
```

#### iOS

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
        <ModalView onRequestClose={() => setVisibility(false)}>
          <YourContentView />
        </ModalView>
      )}
    </View>
  );
};
```

More Examples: https://github.com/paufau/react-native-multiple-modals-examples

---

## Properties

### `contentContainerStyle?: ViewStyle`

Styles of the content wrapper. Use it for aligning your content view.

---

### `onRequestClose?: (calledBy: 'Backdrop' | 'BackButton') => void`

The method is called when backdrop or back button is pressed

> _**TIP**_: If you want the modal to block the interface and not close when user taps the backdrop or back button. Then just don't pass this function. The modal will be rendered until you remove it from the React tree.

---

### `renderBackdrop?: () => ReactNode`

Use it to render custom backdrop. For example `<BlurView />`

---

### `backdropColor?: string`

Default: `rgba(0, 0, 0, 0.3)`

---

### `BackdropPressableComponent?: FC<PressableProps>`

The component which wraps `renderBackdrop`.
Use it to overwrite default props or make backdrop untouchable.

---

### `containerSize?: { width: number, height: number }`

Use to change the modals's rendering area. May be useful for foldable devices.

Default: Dimensions.get('screen')

---

## Author

- [Pavel Pakseev](https://www.linkedin.com/in/pavel-pakseev/)

## Sponsor & Support

If you found the library useful, you can support me here:

<a href='https://ko-fi.com/Y8Y315L7NK' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi2.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
