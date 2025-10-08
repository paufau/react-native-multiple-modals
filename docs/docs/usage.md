---
sidebar_position: 3
---

# Usage

## Basic Usage

The most basic way to use React Native Multiple Modals is to conditionally render the `ModalView` component:

```tsx
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { ModalView } from 'react-native-multiple-modals';

const BasicExample = () => {
  const [isVisible, setVisibility] = useState(false);

  return (
    <View style={styles.container}>
      <Button title='Open Modal' onPress={() => setVisibility(true)} />
      
      {isVisible && (
        <ModalView onRequestDismiss={() => setVisibility(false)}>
          <View style={styles.modalContent}>
            <Text>This is a modal!</Text>
            <Button title='Close' onPress={() => setVisibility(false)} />
          </View>
        </ModalView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});
```

## With Animation

You can add animations to your modal using the `animationType` prop:

```tsx
<ModalView
  animationType='fade'
  onRequestDismiss={() => setVisibility(false)}
>
  <YourContentView />
</ModalView>
```

Available animation types:
- `'none'` - No animation (default)
- `'fade'` - Fade in/out
- `'slide'` - Slide from bottom

## With Custom Backdrop

Customize the backdrop color:

```tsx
<ModalView
  animationType='fade'
  backdropColor='rgba(0, 0, 0, 0.5)'
  onRequestDismiss={() => setVisibility(false)}
>
  <YourContentView />
</ModalView>
```

## With Status Bar Configuration

Control the status bar appearance (Native only):

```tsx
<ModalView
  animationType='fade'
  statusBar={{ translucent: true, barStyle: 'dark-content' }}
  onRequestDismiss={() => setVisibility(false)}
>
  <YourContentView />
</ModalView>
```

## Complete Example

Here's a more complete example with styling and backdrop:

```tsx
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { ModalView } from 'react-native-multiple-modals';

const CompleteExample = () => {
  const [isVisible, setVisibility] = useState(false);

  return (
    <View style={styles.container}>
      <Button text='Open Modal' onPress={() => setVisibility(true)} />
      
      {isVisible && (
        <ModalView
          animationType='fade'
          statusBar={{ translucent: true, barStyle: 'dark-content' }}
          backdropColor='rgba(0, 0, 0, 0.5)'
          contentContainerStyle={styles.modalContainer}
          onRequestDismiss={() => setVisibility(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.description}>
              This is a fully styled modal with animations.
            </Text>
            <Button title='Close' onPress={() => setVisibility(false)} />
          </View>
        </ModalView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    color: '#666',
  },
});
```

## Multiple Modals

One of the key features of this library is the ability to display multiple modals simultaneously:

```tsx
const MultipleModalsExample = () => {
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  return (
    <View style={styles.container}>
      <Button title='Open First Modal' onPress={() => setModal1Visible(true)} />
      
      {modal1Visible && (
        <ModalView
          animationType='fade'
          onRequestDismiss={() => setModal1Visible(false)}
        >
          <View style={styles.modalContent}>
            <Text>First Modal</Text>
            <Button 
              title='Open Second Modal' 
              onPress={() => setModal2Visible(true)} 
            />
            <Button 
              title='Close' 
              onPress={() => setModal1Visible(false)} 
            />
          </View>
        </ModalView>
      )}
      
      {modal2Visible && (
        <ModalView
          animationType='slide'
          onRequestDismiss={() => setModal2Visible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: 'lightblue' }]}>
            <Text>Second Modal (on top!)</Text>
            <Button 
              title='Close' 
              onPress={() => setModal2Visible(false)} 
            />
          </View>
        </ModalView>
      )}
    </View>
  );
};
```

## Blocking Dismissal

If you want to prevent the modal from being dismissed by tapping the backdrop or pressing the back button, simply don't provide the `onRequestDismiss` callback:

```tsx
<ModalView>
  <YourContentView />
</ModalView>
```

The modal will remain visible until you remove it from the React tree.

## More Examples

For more advanced examples and use cases, check out the [examples repository](https://github.com/paufau/react-native-multiple-modals-examples).

## Next Steps

- Explore all available [properties and their options](./api/properties.md)
- Check the [troubleshooting guide](./troubleshooting.md) if you encounter issues
