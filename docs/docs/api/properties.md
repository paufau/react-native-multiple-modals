---
sidebar_position: 4
---

# Properties

Complete reference for all available properties of the `ModalView` component.

## animationType

```tsx
animationType?: "fade" | "slide" | "none"
```

**Default:** `"none"`

The `animationType` prop controls how the modal animates when appearing and disappearing.

**Possible values:**

- `"slide"` - Slides in from the bottom
- `"fade"` - Fades into view
- `"none"` - Appears without an animation

**Example:**

```tsx
<ModalView animationType='fade'>
  <YourContentView />
</ModalView>
```

---

## contentContainerStyle

```tsx
contentContainerStyle?: ViewStyle
```

Styles for the content wrapper. Use it for aligning your content view within the modal.

**Example:**

```tsx
<ModalView
  contentContainerStyle={{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }}
>
  <YourContentView />
</ModalView>
```

---

## statusBar

```tsx
statusBar?: StatusBarProps
```

**Platform:** Native Only (iOS & Android)

Controls the status bar appearance within the modal.

**Platform-specific support:**
- **Android** - Supports only `translucent` and `barStyle` props
- **iOS** - All StatusBar props are supported

[See React Native StatusBarProps documentation](https://reactnative.dev/docs/statusbar#props)

**Example:**

```tsx
<ModalView
  statusBar={{
    translucent: true,
    barStyle: 'dark-content',
    backgroundColor: 'transparent',
  }}
>
  <YourContentView />
</ModalView>
```

---

## disableDefaultStatusBarIOS

```tsx
disableDefaultStatusBarIOS?: boolean
```

**Default:** `false`

**Platform:** iOS Only

Allows you to disable the inner StatusBar component in case you are using `expo-status-bar` or want to manage the status bar manually.

**Note:** This is only applicable for iOS because the status bar is shared between all modal windows on iOS. On Android, the status bar is tightly coupled to the individual modal window and cannot be controlled through the StatusBar component.

**Example:**

```tsx
<ModalView disableDefaultStatusBarIOS={true}>
  <StatusBar style="dark" /> {/* Using expo-status-bar */}
  <YourContentView />
</ModalView>
```

---

## onRequestDismiss

```tsx
onRequestDismiss?: (calledBy: 'Backdrop' | 'BackButton') => void
```

Callback method that is called when the backdrop is pressed or the back button is pressed (Android).

The `calledBy` parameter indicates what triggered the dismissal:
- `'Backdrop'` - User tapped on the backdrop
- `'BackButton'` - User pressed the hardware back button (Android)

**💡 TIP:** If you want the modal to block the interface and not close when the user taps the backdrop or back button, simply don't pass this function. The modal will remain rendered until you remove it from the React tree.

**Example:**

```tsx
<ModalView
  onRequestDismiss={(calledBy) => {
    console.log(`Modal dismissed by: ${calledBy}`);
    setModalVisible(false);
  }}
>
  <YourContentView />
</ModalView>
```

---

## renderBackdrop

```tsx
renderBackdrop?: () => ReactNode
```

Use this prop to render a custom backdrop component. This is useful when you want to use a blur effect or other custom backdrop implementations.

**Example with BlurView:**

```tsx
import { BlurView } from 'expo-blur';

<ModalView
  renderBackdrop={() => (
    <BlurView
      intensity={50}
      style={StyleSheet.absoluteFill}
    />
  )}
>
  <YourContentView />
</ModalView>
```

---

## backdropColor

```tsx
backdropColor?: string
```

**Default:** `"rgba(0, 0, 0, 0.3)"`

The background color of the default backdrop. This prop is ignored if you provide a custom `renderBackdrop`.

**Example:**

```tsx
<ModalView backdropColor='rgba(0, 0, 0, 0.7)'>
  <YourContentView />
</ModalView>
```

---

## BackdropPressableComponent

```tsx
BackdropPressableComponent?: FC<PressableProps>
```

The component which wraps the backdrop. Use this to override the default Pressable component with your own implementation.

This is useful when you want to:
- Apply additional props to the backdrop
- Use `react-native-gesture-handler`'s Pressable
- Make the backdrop untouchable

**Example making backdrop untouchable:**

```tsx
import { Pressable } from 'react-native';

const UntouchablePressable = (props) => (
  <Pressable {...props} disabled={true} />
);

<ModalView BackdropPressableComponent={UntouchablePressable}>
  <YourContentView />
</ModalView>
```

**Example with gesture handler:**

```tsx
import { Pressable } from 'react-native-gesture-handler';

<ModalView BackdropPressableComponent={Pressable}>
  <YourContentView />
</ModalView>
```

---

## statusBarTranslucent (Deprecated)

```tsx
statusBarTranslucent?: boolean
```

**Default:** `false`

**Platform:** Android Only

:::caution Deprecated
This prop is deprecated. Use the `statusBar` prop instead:
```tsx
<ModalView statusBar={{ translucent: true }}>
```
:::

Determines whether your modal should go under the system status bar.
