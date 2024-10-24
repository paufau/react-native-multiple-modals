import { ReactNode } from 'react';

import {
  Platform,
  requireNativeComponent,
  StyleProp,
  UIManager,
  ViewStyle,
} from 'react-native';
import { COMPONENT_NAME, LIBRARY_NAME } from '../constants';

const LINKING_ERROR =
  `The package '${LIBRARY_NAME}' doesn't seem to be linked. Make sure: \n\n${Platform.select(
    { ios: "- You have run 'pod install'\n", default: '' },
  )}- You rebuilt the app after installing the package\n` +
  `- You are not using Expo Go\n`;

export type RNTModalViewProps = {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  onPressBackAndroid?: () => void;
};

const RNTModalView =
  UIManager.getViewManagerConfig(COMPONENT_NAME) != null
    ? requireNativeComponent<RNTModalViewProps>(COMPONENT_NAME)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export default RNTModalView;
