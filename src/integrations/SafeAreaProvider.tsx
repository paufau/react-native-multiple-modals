import { ReactNode } from 'react';

const importSafeAreaProvider = () => {
  const Errors = {
    SafeAreaProviderNotFound: new Error(
      'SafeAreaProvider not found. Please report the issue: https://github.com/paufau/react-native-multiple-modals/issues',
    ),
  };

  try {
    const SafeAreaProviderComponent =
      require('react-native-safe-area-context').SafeAreaProvider;

    if (!SafeAreaProviderComponent) {
      throw Errors.SafeAreaProviderNotFound;
    }

    return SafeAreaProviderComponent;
  } catch (e) {
    if (e === Errors.SafeAreaProviderNotFound) {
      console.error(e);
    }

    // Fallback component used if the library is not found
    return ({ children }: { children: ReactNode }) => children;
  }
};

export const SafeAreaProvider = importSafeAreaProvider();
