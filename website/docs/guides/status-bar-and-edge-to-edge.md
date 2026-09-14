---
sidebar_position: 4
title: Status bar and edge-to-edge
description: Control the status bar of a ModalView and draw the backdrop under the system bars while keeping the content in the safe area.
---

Each `ModalView` owns a native window, so the status bar is configured per modal through the [`statusBar`](../api.mdx#statusBar) prop rather than through a global `StatusBar` component.

## Status bar

```tsx
<ModalView statusBar={{ translucent: true, barStyle: "light-content" }}>
  {children}
</ModalView>
```

- iOS supports every [`StatusBar` prop](https://reactnative.dev/docs/statusbar#props).
- Android supports only `translucent` and `barStyle`.
- Web ignores the prop.

### Using expo-status-bar on iOS

On iOS the status bar is shared between all windows, so the `StatusBar` that `ModalView` renders internally competes with `expo-status-bar`. Pass [`disableDefaultStatusBarIOS`](../api.mdx#disableDefaultStatusBarIOS) to leave the status bar to your own component. On Android the status bar belongs to the modal window, so there is nothing to disable.

## Edge-to-edge

A full-screen modal whose backdrop covers the system bars while the content stays inside the safe area:

```tsx
import { SafeAreaView } from "react-native-safe-area-context";
import { ModalView } from "react-native-multiple-modals";

<ModalView
  backdropColor="#0d47a1"
  statusBar={{ translucent: true, barStyle: "light-content" }}
  contentContainerStyle={{ flex: 1 }}
  onRequestDismiss={onClose}
>
  <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
</ModalView>;
```

`translucent: true` lets the modal window draw under the status bar, the backdrop color fills the whole screen, and `SafeAreaView` pads the content back inside the safe area.

Full source: [EdgeToEdgeModal.tsx](https://github.com/paufau/react-native-multiple-modals/blob/main/example/demo-components/src/modals/edge-to-edge/EdgeToEdgeModal.tsx).
