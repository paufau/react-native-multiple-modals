---
sidebar_position: 3
title: Blur backdrop
description: Replace the default backdrop of a ModalView with a blur view from expo-blur.
---

By default `ModalView` draws a translucent color behind the content, configurable through [`backdropColor`](../api.mdx#backdropColor). [`renderBackdrop`](../api.mdx#renderBackdrop) replaces that view with whatever you return, for example a blur.

## Blur with expo-blur

The returned element is rendered inside the pressable that handles backdrop taps, so it only needs to fill the available space.

```tsx
import { BlurView } from 'expo-blur';
import { ModalView } from 'react-native-multiple-modals';

const BlurredModal = ({ onClose, children }) => (
  <ModalView
    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
    onRequestDismiss={onClose}
    renderBackdrop={() => <BlurView intensity={40} style={{ flex: 1 }} />}
  >
    {children}
  </ModalView>
);
```

Tapping the blur still calls `onRequestDismiss`, because the pressable wraps whatever `renderBackdrop` returns. To make the backdrop untouchable, swap the pressable through [`BackdropPressableComponent`](../api.mdx#BackdropPressableComponent).

Full source: [BlurredModal.native.tsx](https://github.com/paufau/react-native-multiple-modals/blob/main/example/demo-components/src/modals/blurred/BlurredModal.native.tsx). The example keeps a separate Web implementation next to it.
