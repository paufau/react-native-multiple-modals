---
sidebar_position: 1
title: Multiple modals
description: Show several ModalViews at the same time and learn how their stacking order is decided.
---

React Native's built-in `Modal` shows one modal at a time on iOS. `ModalView` has no such limit: every instance gets its own native window on iOS and Android and its own portal on Web, so any number of them can be open at once, on top of each other and on top of a built-in `Modal`

## Two modals side by side

Render the modals as siblings, each with its own visibility state. Nothing links them together: each one has its own backdrop and its own `onRequestDismiss`

```tsx
import { useState } from "react";
import { Button, Text, View } from "react-native";
import { ModalView } from "react-native-multiple-modals";

const centered = { justifyContent: "center", alignItems: "center" } as const;

const TwoModals = () => {
  const [isFirstVisible, setFirstVisibility] = useState(false);
  const [isSecondVisible, setSecondVisibility] = useState(false);

  return (
    <View>
      <Button title="Open first" onPress={() => setFirstVisibility(true)} />
      <Button title="Open second" onPress={() => setSecondVisibility(true)} />

      {isFirstVisible && (
        <ModalView
          contentContainerStyle={centered}
          onRequestDismiss={() => setFirstVisibility(false)}
        >
          <View style={styles.card}>
            <Text>First modal</Text>
            <Button
              title="Open second"
              onPress={() => setSecondVisibility(true)}
            />
            <Button title="Close" onPress={() => setFirstVisibility(false)} />
          </View>
        </ModalView>
      )}

      {isSecondVisible && (
        <ModalView
          contentContainerStyle={centered}
          onRequestDismiss={() => setSecondVisibility(false)}
        >
          <View style={styles.card}>
            <Text>Second modal</Text>
            <Button
              title="Open first"
              onPress={() => setFirstVisibility(true)}
            />
            <Button title="Close" onPress={() => setSecondVisibility(false)} />
          </View>
        </ModalView>
      )}
    </View>
  );
};

const styles = {
  card: { backgroundColor: "white", padding: 20, borderRadius: 16 },
};
```

## Stacking order

**_Modals are stacked in the order they were opened, not in the order they appear in the markup._**

A `ModalView` is shown once it mounts. It goes on top of every modal that is already open. In the example above, opening the second modal and then the first one from inside of it puts the first modal on top, even though it comes first in the JSX.

The topmost modal is the one that receives the Android back button and the Escape key on Web, tapping a backdrop calls the `onRequestDismiss` of the top modal only.

## Above the built-in Modal

`ModalView` is always rendered above a RN's default `Modal`
