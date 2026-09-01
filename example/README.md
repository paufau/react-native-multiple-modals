# example

Expo app that runs `react-native-multiple-modals` (from `../src`) against the
latest Expo SDK, on iOS, Android, and web. The demo gallery lives in
`demo-components/` (vendored from
[react-native-multiple-modals-examples](https://github.com/paufau/react-native-multiple-modals-examples)).

Because the library ships custom native (Fabric) code, iOS/Android run as a
**dev build** — not Expo Go.

## Run

```bash
cd example
npm install                 # links the library via file:.. and installs deps
npx expo prebuild --clean   # generates ios/ + android/ (regenerable; gitignored)

npx expo run:ios            # iOS simulator
npx expo run:android        # Android emulator/device
npx expo start --web        # web (react-native-web)
```

## How it's wired

- `metro.config.js` maps `react-native-multiple-modals` → `../src` (consumes TS
  source directly, no build step) and forces the library's peer deps to resolve
  from this app's `node_modules`, blocking the repo root's copies.
- `react-native-multiple-modals` is a `file:..` dependency so `expo prebuild`
  autolinks the native module.
