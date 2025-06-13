# React Native Multiple Modals

[![NPM Version](https://img.shields.io/npm/v/react-native-multiple-modals)](https://www.npmjs.com/package/react-native-multiple-modals)
![Static Badge](https://img.shields.io/badge/types-included-81B622)
[![NPM Downloads](https://img.shields.io/npm/dm/react-native-multiple-modals)](https://www.npmjs.com/package/react-native-multiple-modals)

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
- 🛠️ Displays above bottom tabs navigation

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

More Examples: https://github.com/paufau/react-native-multiple-modals-examples

---

## Properties

### `animationType?: "fade" | "slide" | "none" = "none"`

The animationType prop controls how the modal animates.

Possible values:

- "slide" slides in from the bottom
- "fade" fades into view
- "none" appears without an animation

---

### `contentContainerStyle?: ViewStyle`

Styles of the content wrapper. Use it for aligning your content view.

---

### `statusBar?: StatusBarProps`

Controls the status bar.

Android - supports only `translucent`, `barStyle`

iOS - all props are supported.

[See StatusBarProps type](https://reactnative.dev/docs/statusbar#props)

---

### `disableDefaultStatusBarIOS?: boolean = false` - iOS only

Allows to disable inner StatusBar component in case you are using 'expo-status-bar'.

Note that it is only applicable for iOS because there status bar is shared between all modal windows. On the other hand on android status bar is tightly coupled to the individual modal window and couldn't be controller through the StatusBar component.

---

### `onRequestDismiss?: (calledBy: 'Backdrop' | 'BackButton') => void`

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

### @Deprecated (use `statusBar` prop) `statusBarTranslucent?: boolean = false` - Android only

Determines whether your modal should go under the system statusbar.

---

## Contribution

#### FOUND A BUG? HELP THE PROJECT AND REPORT IT!

If you notice any bugs or anything working differently compared to React Native, feel free to open an issue. It’ll really help improve the project 🙏.

Also, if there are any well-known issues in React Native that haven’t been fixed for a long time and they show up here too, let me know! Let’s make things better together 😎.

## Known issues

- Some layout animations from `react-native-reanimated` don't work properly inside the ModalView on new architecture

## Roadmap

Common:

- Add UI tests automation
- Create separate documentation page

## Versions

| version       | react-native | links                                                                               |
| ------------- | ------------ | ----------------------------------------------------------------------------------- |
| 2.0.0+        | 71+          | [Documentation](https://github.com/paufau/react-native-multiple-modals/tree/main)   |
| 1.0.0 - 1.2.6 | 70+          | [Documentation](https://github.com/paufau/react-native-multiple-modals/tree/v1.2.6) |

## Author

- [Pavel Pakseev](https://www.linkedin.com/in/pavel-pakseev/)
