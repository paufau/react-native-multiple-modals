import {NavigationContainer} from '@react-navigation/native';

// Related issues:
// https://github.com/software-mansion/react-native-screens/issues/1769
const initNavigationContainer = () => {
  try {
    // v7+
    const IndependentTree =
      require('@react-navigation/native').NavigationIndependentTree;

    return (props: any) => (
      <IndependentTree>
        <NavigationContainer {...props} />
      </IndependentTree>
    );
  } catch (e) {
    // v6
    // @ts-ignore
    return (props: any) => <NavigationContainer independent {...props} />;
  }
};

export const NavigationContainerCompat = initNavigationContainer();
