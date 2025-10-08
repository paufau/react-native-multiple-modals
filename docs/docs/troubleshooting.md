---
sidebar_position: 5
---

# Troubleshooting

Common issues and their solutions when using React Native Multiple Modals.

## Known Issues

### Reanimated Modal Size Issue

**Issue:** Modal has wrong size on the first render only when using React Native Reanimated.

**Details:** This is a known issue with React Native Reanimated itself, not this library.

**GitHub Issue:** https://github.com/software-mansion/react-native-reanimated/issues/6659

**Workaround:** You may need to trigger a re-render or use a delay before showing the modal content.

---

## Common Problems

### Modal Not Showing

**Problem:** The modal component is rendered but nothing appears on screen.

**Solutions:**

1. **Check conditional rendering:** Make sure the modal is actually being rendered in your component tree.

```tsx
{isVisible && <ModalView>...</ModalView>}  // ✅ Correct
```

2. **Verify content styles:** Ensure your modal content has visible dimensions:

```tsx
<ModalView>
  <View style={{ width: 300, height: 200, backgroundColor: 'white' }}>
    <Text>Content</Text>
  </View>
</ModalView>
```

3. **Check contentContainerStyle:** If using `contentContainerStyle`, make sure it doesn't hide the content:

```tsx
<ModalView
  contentContainerStyle={{
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  {/* ... */}
</ModalView>
```

---

### Modal Can't Be Dismissed

**Problem:** Tapping the backdrop or back button doesn't close the modal.

**Solution:** Make sure you've provided the `onRequestDismiss` callback:

```tsx
<ModalView
  onRequestDismiss={() => setVisible(false)}  // ✅ Add this
>
  {/* ... */}
</ModalView>
```

**Note:** If you intentionally want to prevent dismissal, not providing `onRequestDismiss` is the correct approach.

---

### Multiple Modals Not Stacking

**Problem:** When opening a second modal, the first one disappears.

**Solution:** Make sure both modals are in the render tree at the same time:

```tsx
{modal1Visible && <ModalView>...</ModalView>}
{modal2Visible && <ModalView>...</ModalView>}  // Both should be rendered
```

---

### Status Bar Issues on iOS

**Problem:** Status bar appearance doesn't change or conflicts with expo-status-bar.

**Solutions:**

1. **Using with expo-status-bar:** Disable the default status bar:

```tsx
<ModalView disableDefaultStatusBarIOS={true}>
  <StatusBar style="dark" />
  {/* ... */}
</ModalView>
```

2. **Status bar not updating:** Make sure you're setting the correct props:

```tsx
<ModalView
  statusBar={{
    barStyle: 'dark-content',
    translucent: true,
  }}
>
  {/* ... */}
</ModalView>
```

---

### Android Status Bar Configuration

**Problem:** Some StatusBar props don't work on Android.

**Solution:** Android only supports `translucent` and `barStyle` props:

```tsx
// ✅ Supported on Android
<ModalView
  statusBar={{
    translucent: true,
    barStyle: 'dark-content',
  }}
>
  {/* ... */}
</ModalView>

// ❌ Other props won't work on Android
<ModalView
  statusBar={{
    hidden: true,  // Not supported on Android
    backgroundColor: 'red',  // Not supported on Android
  }}
>
  {/* ... */}
</ModalView>
```

---

### Web Platform Issues

**Problem:** Modal doesn't work correctly on web.

**Solution:** Make sure you have `react-dom` installed:

```bash
npm install react-dom
```

---

## Performance Issues

### Modal Rendering is Slow

**Solutions:**

1. **Optimize modal content:** Use React.memo for complex modal content:

```tsx
const ModalContent = React.memo(() => {
  return (
    <View>
      {/* Complex content */}
    </View>
  );
});

<ModalView>
  <ModalContent />
</ModalView>
```

2. **Lazy load content:** Only render heavy content when modal is visible:

```tsx
{isVisible && (
  <ModalView>
    <HeavyComponent />
  </ModalView>
)}
```

---

## TypeScript Issues

### Type Errors with Props

**Problem:** TypeScript errors when using certain props.

**Solution:** Make sure you're importing the types correctly:

```tsx
import { ModalView, type ModalViewProps } from 'react-native-multiple-modals';
```

---

## Still Having Issues?

If you're experiencing an issue not covered here:

1. **Check existing issues:** Visit the [GitHub Issues](https://github.com/paufau/react-native-multiple-modals/issues) page
2. **Create a new issue:** If your problem is new, please [open an issue](https://github.com/paufau/react-native-multiple-modals/issues/new) with:
   - A clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment (React Native version, platform, etc.)
   - Code samples if possible

3. **Check the examples:** Review the [examples repository](https://github.com/paufau/react-native-multiple-modals-examples) for working implementations

---

## Getting Help

- 📚 Check the [Usage Guide](./usage.md) for common patterns
- 🔍 Review the [API Reference](./api/properties.md) for all available props
- 💬 Ask questions in [GitHub Discussions](https://github.com/paufau/react-native-multiple-modals/discussions)
