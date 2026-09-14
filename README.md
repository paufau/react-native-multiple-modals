# React Native Multiple Modals

[![NPM Version](https://img.shields.io/npm/v/react-native-multiple-modals)](https://www.npmjs.com/package/react-native-multiple-modals)
[![NPM Downloads](https://img.shields.io/npm/dm/react-native-multiple-modals)](https://www.npmjs.com/package/react-native-multiple-modals)
![Static Badge](https://img.shields.io/badge/plarforms-iOS%2C_Android%2C_Web-7a34eb)
![Static Badge](https://img.shields.io/badge/types-included-81B622)
[![nightly](https://github.com/paufau/react-native-multiple-modals/actions/workflows/nightly.yml/badge.svg)](https://github.com/paufau/react-native-multiple-modals/actions/workflows/nightly.yml)

Native Modal implementation which allows to display multiple Modals simultaneously.

![React Native Multiple Modals](./assets/preview.gif)

**Documentation:** https://paufau.github.io/react-native-multiple-modals/

- [Getting Started](https://paufau.github.io/react-native-multiple-modals/getting-started/)
- [Guides](https://paufau.github.io/react-native-multiple-modals/guides/)
- [API Reference](https://paufau.github.io/react-native-multiple-modals/api/)
- [Compatibility](https://paufau.github.io/react-native-multiple-modals/compatibility/)

## ✨ Features

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

More examples: [example/demo-components/src/modals](https://github.com/paufau/react-native-multiple-modals/tree/main/example/demo-components/src/modals)

## Contribution

#### FOUND A BUG? HELP THE PROJECT AND REPORT IT!

If you notice any bugs or anything working differently compared to React Native, feel free to open an issue. It’ll really help improve the project 🙏.

#### Still missing something?

I would love if you would let me know what you are missing in the library. _Together we can make it a community standard!_

## Roadmap

- Drop old architecture support & deprecated props

## Sponsor & Support

If you found the library useful, you can support me here:

<a href='https://ko-fi.com/Y8Y315L7NK' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi2.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
