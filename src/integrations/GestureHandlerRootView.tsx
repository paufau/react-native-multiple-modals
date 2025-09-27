import { ReactNode } from 'react';

// The library is connected if it is detected at runtime.
// By default, gestures do not work inside a modal window.
const importGestureHandlerRootView = () => {
  const Errors = {
    GestureHandlerRootViewNotFound: new Error(
      'GestureHandlerRootView not found. Please report the issue: https://github.com/paufau/react-native-multiple-modals/issues',
    ),
  };

  try {
    const GestureHandlerRootViewComponent =
      require('react-native-gesture-handler').GestureHandlerRootView;

    if (!GestureHandlerRootViewComponent) {
      throw Errors.GestureHandlerRootViewNotFound;
    }

    return GestureHandlerRootViewComponent;
  } catch (e) {
    if (e === Errors.GestureHandlerRootViewNotFound) {
      console.error(e);
    }

    // Fallback component used if the library is not found
    return ({ children }: { children: ReactNode }) => children;
  }
};

export const GestureHandlerRootView = importGestureHandlerRootView();
