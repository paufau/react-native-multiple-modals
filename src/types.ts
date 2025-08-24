import type { FC, ReactNode } from 'react';

import type {
  StyleProp,
  ViewStyle,
  StatusBarProps,
  PressableProps,
} from 'react-native';

import { DismissalSource } from './ModalView';

export type ModalViewProps = {
  /**
   * The content of the modal.
   */
  children: ReactNode;

  /**
   * A function that renders the backdrop.
   * If not provided, a default backdrop will be rendered.
   */
  renderBackdrop?: () => ReactNode;

  /**
   * Callback function that is called when the modal is dismissed.
   * The `calledBy` parameter indicates the source of the dismissal.
   */
  onRequestDismiss?: (calledBy: DismissalSource) => void;

  /**
   * Style for the content container of the modal.
   * This is applied to the view that contains the children.
   */
  contentContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Custom status bar properties.
   * Android supports only `translucent` & `barStyle` props.
   */
  statusBar?: StatusBarProps;

  /**
   * Whether to disable the default iOS status bar behavior.
   * If true, the status bar will not be rendered on iOS.
   * Useful when you want to manage the status bar manually or use `expo-status-bar`.
   */
  disableDefaultStatusBarIOS?: boolean;

  /**
   * Custom component to be used as the backdrop pressable.
   * Useful when you want to apply additional props or use `react-native-gesture-handler`'s `Pressable`.
   */
  BackdropPressableComponent?: FC<PressableProps>;

  /**
   * The color of the backdrop.
   * Defaults to 'rgba(0, 0, 0, 0.3)'.
   */
  backdropColor?: string;

  /**
   * The type of animation to use when showing the modal.
   * Can be 'none', 'fade', or 'slide'.
   * Defaults to 'none'.
   */
  animationType?: 'none' | 'fade' | 'slide';

  /**
   * @deprecated Use `statusBar.translucent` instead.
   */
  statusBarTranslucent?: boolean;
};

export type BackdropProps = Omit<PressableProps, 'onPress' | 'style'> & {
  style?: StyleProp<ViewStyle>;
};
