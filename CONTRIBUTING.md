# Contributing

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project, and see our [Code of Conduct](./CODE_OF_CONDUCT.md).

This is a native module, so the JS specific code lives in `src/` and the platform implementations live in `android/` (Kotlin) and `ios/` (Objective-C++).

The library actively supports **New Architecture (Fabric)** only

## Development workflow

The repository is split into two packages: the library at the root, and the [example app](/example/) used to test changes.

Install the library dependencies from the root:

```sh
npm install
```

Then install the example app dependencies:

```sh
cd example
npm install
```

While developing, run the example app to test your changes. From the `example/` directory:

To start the Metro packager:

```sh
npm start
```

To run the example app on Android:

```sh
npm run android
```

To run the example app on iOS:

```sh
npm run ios
```

To run the example app on Web:

```sh
npm run web
```

> Native code changes (in `android/` or `ios/`) require a rebuild, so you have to re-run `npm run android` / `npm run ios` rather than a fast refresh. Changes to `src/newarch/` regenerate codegen output on the next native build

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, _(e.g. "fix: modal not dismissing on Android back press")_
- `feat`: new features, _(e.g. "feat: add a new prop to the modal component")_
- `refactor`: code refactor, _(e.g. "refactor: simplify the web stacking logic")_
- `docs`: changes to documentation, _(e.g. "docs: add a usage example to the README")_
- `test`: adding or updating tests, _(e.g. "test: add an e2e flow for rotation")_
- `chore`: tooling changes, _(e.g. "chore: change the CI config")_

An optional scope may be used to indicate the affected platform, e.g. `feat(web):` or `fix(ios):`

### Linting and tests

```sh
cd example
npm run e2e:run
```

### Scripts

Scripts in the root `package.json`:

- `npm install`: install the library dependencies.
- `npm run lint`: lint `src/`.
- `npm run typecheck`: type-check the library with TypeScript.
- `npm run build`: build the library with [react-native-builder-bob](https://github.com/callstack/react-native-builder-bob).

Scripts in `example/package.json` (run from the `example/` directory):

- `npm start`: start the Metro server for the example app.
- `npm run android`: run the example app on Android.
- `npm run ios`: run the example app on iOS.
- `npm run web`: run the example app on Web.
- `npm run typecheck`: type-check the example app.
- `npm run e2e:run`: run the end-to-end screenshot tests.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that lint, type checking, and the build pass locally.
- If you touched native code, confirm the example app builds and runs on the affected platform.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or native implementation, discuss with maintainers first by [opening an issue](https://github.com/paufau/react-native-multiple-modals/issues).
