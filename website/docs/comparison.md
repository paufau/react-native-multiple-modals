---
slug: /comparison
sidebar_position: 5
title: Comparison
description: How ModalView compares to React Native's Modal and to other modal libraries.
---

`ModalView` gives every modal its own `UIWindow` on iOS, its own `Dialog` on Android and its own portal on Web. Any number of them stack, over each other and over a built-in `Modal`.

|                                                                                                                                                   | Native or JS | Multiple at once | Accessibility |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ---------------- | ------------- |
| **react-native-multiple-modals**                                                                                                                  | Native       | ✅               | ✅            |
| [`Modal`](https://reactnative.dev/docs/modal) (React Native)                                                                                      | Native       | ❌ on iOS        | ✅            |
| [react-native-modal](https://github.com/react-native-modal/react-native-modal)                                                                    | Native       | ❌               | ✅            |
| [react-native-modalfy](https://github.com/colorfy-software/react-native-modalfy)                                                                  | JS           | ✅               | ❌            |
| [@react-navigation/native-stack](https://reactnavigation.org/docs/native-stack-navigator/)                                                        | Native       | ✅               | ❌            |
| [@gorhom/portal](https://github.com/gorhom/react-native-portal), [react-native-portalize](https://github.com/jeremybarbet/react-native-portalize) | JS           | ✅               | ❌            |

## Next steps

- [Getting Started](./getting-started.md)
- [Multiple modals](./guides/multiple-modals.md)
