---
sidebar_position: 7
---

# Versions

Version compatibility information for React Native Multiple Modals.

## Current Version

The current version is **3.2.2** (as of the latest release).

## Version Compatibility Matrix

| Library Version | React Native | Old Architecture | New Architecture | Documentation |
| --------------- | ------------ | ---------------- | ---------------- | ------------- |
| **3.0.0+**      | 73+          | ✅ Supported     | ✅ Supported     | [Main Docs](https://github.com/paufau/react-native-multiple-modals/tree/main) |
| **2.0.0 - 2.5.0** | 71+        | ✅ Supported     | ✅ Supported     | [v2.5.0 Docs](https://github.com/paufau/react-native-multiple-modals/tree/v2.5.0) |
| **1.0.0 - 1.2.6** | 70+        | ✅ Supported     | ❌ Not Supported | [v1.2.6 Docs](https://github.com/paufau/react-native-multiple-modals/tree/v1.2.6) |

## Version 3.x

### Requirements
- React Native 0.73.0 or higher
- React 18 or higher
- Supports both Old and New Architecture

### Key Features
- Full support for React Native's New Architecture
- Enhanced status bar configuration
- Improved TypeScript types
- Web platform support
- Better accessibility support

## Version 2.x

### Requirements
- React Native 0.71.0 or higher
- React 18 or higher
- Supports both Old and New Architecture

### Key Features
- Initial New Architecture support
- Multiple modals simultaneously
- Enhanced backdrop customization

## Version 1.x

### Requirements
- React Native 0.70.0 or higher
- Old Architecture only

### Key Features
- Basic multiple modals support
- Animation support
- Status bar configuration

## Migration Guides

### Migrating from 2.x to 3.x

Version 3.x is largely compatible with 2.x, but includes some improvements:

1. **Enhanced Status Bar Props:**
   ```tsx
   // Old way (still works but deprecated)
   <ModalView statusBarTranslucent={true} />
   
   // New way
   <ModalView statusBar={{ translucent: true }} />
   ```

2. **Improved TypeScript types** - Better type inference for props

### Migrating from 1.x to 2.x

Version 2.x introduced New Architecture support with minimal breaking changes:

1. **React Native version requirement increased to 0.71+**
2. **React version requirement increased to 18+**

Most APIs remained the same, so migration should be straightforward.

## Choosing the Right Version

### Use Version 3.x If:
- ✅ You're using React Native 0.73 or higher
- ✅ You want the latest features and improvements
- ✅ You need full New Architecture support
- ✅ You're starting a new project

### Use Version 2.x If:
- ✅ You're using React Native 0.71 or 0.72
- ✅ You need stable New Architecture support
- ⚠️ You can't upgrade to RN 0.73+ yet

### Use Version 1.x If:
- ✅ You're using React Native 0.70
- ⚠️ You're only using Old Architecture
- ⚠️ You can't upgrade React Native

:::tip Recommendation
We recommend always using the latest version compatible with your React Native version for the best experience and latest features.
:::

## Checking Your Installed Version

To check which version you have installed:

```bash
npm list react-native-multiple-modals
```

or check your `package.json`:

```json
{
  "dependencies": {
    "react-native-multiple-modals": "^3.2.2"
  }
}
```

## Upgrading

To upgrade to the latest version:

```bash
npm install react-native-multiple-modals@latest
```

or with yarn:

```bash
yarn upgrade react-native-multiple-modals --latest
```

Don't forget to run pod install for iOS after upgrading:

```bash
cd ios && pod install && cd ..
```

## Release Notes

For detailed release notes and changelog, visit:
- [GitHub Releases](https://github.com/paufau/react-native-multiple-modals/releases)
- [Changelog](https://github.com/paufau/react-native-multiple-modals/blob/main/CHANGELOG.md) (if available)

## Support Policy

- **Latest major version** (3.x): Full support with new features and bug fixes
- **Previous major version** (2.x): Security fixes and critical bug fixes only
- **Older versions** (1.x): No longer actively supported

## Questions?

If you have questions about which version to use:
- Check the [GitHub Issues](https://github.com/paufau/react-native-multiple-modals/issues)
- Ask in [GitHub Discussions](https://github.com/paufau/react-native-multiple-modals/discussions)
