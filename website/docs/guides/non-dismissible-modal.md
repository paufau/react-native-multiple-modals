---
sidebar_position: 2
title: Non-dismissible modal
description: Keep a ModalView open until your own code removes it, ignoring backdrop taps and the back button.
---

A `ModalView` closes when it is removed from the React tree, and only then. Backdrop taps and the back button do not close it by themselves: they call [`onRequestDismiss`](../api.mdx#onRequestDismiss), and it is up to that callback to update your state.

## Close with your own button

Leave out `onRequestDismiss`. Backdrop taps and the back button then do nothing, and the modal stays until you manually unmount it, for example from a button inside the content or when an operation finishes.

```tsx
import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { ModalView } from 'react-native-multiple-modals';

const ConfirmModal = ({ onConfirm }: { onConfirm: () => void }) => {
  const [isVisible, setVisibility] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <ModalView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      {/* no onRequestDismiss: backdrop taps and the back button are ignored */}
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 16 }}>
        <Text>Are you sure?</Text>
        <Button
          title='Confirm'
          onPress={() => {
            setVisibility(false);
            onConfirm();
          }}
        />
      </View>
    </ModalView>
  );
};
```

Full source: [BlockingModal.tsx](https://github.com/paufau/react-native-multiple-modals/blob/main/example/demo-components/src/modals/blocking/BlockingModal.tsx).
