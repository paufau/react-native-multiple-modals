import { ReactNode } from 'react';

import {
  Platform,
  requireNativeComponent,
  StyleProp,
  UIManager,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-multiple-modals' doesn't seem to be linked. Make sure: \n\n${Platform.select(
    { ios: "- You have run 'pod install'\n", default: '' },
  )}- You rebuilt the app after installing the package\n` +
  `- You are not using Expo Go\n`;

export type RNTModalViewProps = {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

const ComponentName = 'RNTModalView';

export const RNTModalView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<RNTModalViewProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
