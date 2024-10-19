# react-native-multiple-modals

The main goal of this library is to provide a component that allows to display multiple modals at the same time.

No additional props to manage StatusBar or SafeArea. I try to make the ModalView component as lightweight as possible. It solves one problem - shows a modal. Everything else is the task of other components.

## ✨ Features

- 📱 iOS & Android support multiple modals
- ✅ Accessibility support

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

### `style?: ViewStyle`

Controls styles of the view which contains content

---

### `onRequestClose?: () => void`

The method is called when backdrop or back button is pressed

> _**NOTE**_: Modal will always be rendered until it's removed from React tree

---

### `backdropProps?: PressableProps`

For fine-tuning of the default backdrop

---

### `renderBackdrop?: (calledBy: DismissalSource) => ReactNode`

When backdropProps are no longer enough.

> _**NOTE**_: While rendering custom backdrop `onRequestClose` is not called, so you should handle backdrop press by yourself

---

## Roadmap

| version | goal                             |
| ------- | -------------------------------- |
| 1.0.0   | Setup linters & tests            |
| 1.1.0   | NPM repo release                 |
| 1.2.0   | JS-based projects support        |
| 1.3.0   | Expo support                     |
| 1.4.0   | New Architecture support         |
| 1.5.0+  | To be the best lib on the market |
