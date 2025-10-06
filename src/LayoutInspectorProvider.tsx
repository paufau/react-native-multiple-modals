import { FC, PropsWithChildren, useContext } from 'react';

import AppContainer from 'react-native/Libraries/ReactNative/AppContainer';
import { RootTagContext } from 'react-native/Libraries/ReactNative/RootTag';

// Wrap the children in AppContainer so the React Native inspector works
// within the modal. See https://github.com/facebook/react-native/blob/v0.81.4/packages/react-native/Libraries/Modal/Modal.js#L308
// for the inspiration within the RN Modal component.
export const LayoutInspectorProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const rootTag = useContext(RootTagContext);

  // The inspector is only needed in development
  if (!__DEV__) {
    return children;
  }

  return <AppContainer rootTag={rootTag}>{children}</AppContainer>;
};
