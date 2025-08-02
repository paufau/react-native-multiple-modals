import { FC, ReactNode } from 'react';

import {
  Platform,
  Pressable,
  PressableProps,
  StatusBar,
  StatusBarProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { ScrollContextResetter } from './ScrollContextResetter';
import { GestureHandlerRootView } from './integrations/GestureHandlerRootView';
import RNTModalView from './newarch/NativeRNTModalView';

export type BackdropProps = Omit<PressableProps, 'onPress' | 'style'> & {
  style?: StyleProp<ViewStyle>;
};

export enum DismissalSource {
  BackButton = 'BackButton',
  Backdrop = 'Backdrop',
}

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

const backdropAccessibilityLabel = 'Backdrop';
const backdropAccessibilityHint = 'Double-tap to close the modal';
const defaultBackdropColor = 'rgba(0, 0, 0, 0.3)';
const isIOS = Platform.OS === 'ios';

export const ModalView: FC<ModalViewProps> = ({
  children,
  renderBackdrop,
  onRequestDismiss,
  contentContainerStyle,
  statusBar,
  BackdropPressableComponent = Pressable,
  backdropColor = defaultBackdropColor,
  disableDefaultStatusBarIOS = false,
  animationType = 'none',
  statusBarTranslucent,
}) => {
  return (
    <RNTModalView
      style={styles.container}
      statusBarTranslucent={statusBar?.translucent ?? statusBarTranslucent}
      statusBarIconsStyle={statusBar?.barStyle ?? undefined}
      onPressBackAndroid={() => onRequestDismiss?.(DismissalSource.BackButton)}
      animationType={animationType}
    >
      <View collapsable={false} style={styles.flex}>
        {isIOS && statusBar && !disableDefaultStatusBarIOS ? (
          <StatusBar {...statusBar} />
        ) : null}
        <GestureHandlerRootView style={styles.flex}>
          <View style={[styles.backdropContainer]}>
            <BackdropPressableComponent
              accessibilityLabel={backdropAccessibilityLabel}
              accessibilityHint={backdropAccessibilityHint}
              style={styles.flex}
              onPress={() => onRequestDismiss?.(DismissalSource.Backdrop)}
            >
              {renderBackdrop ? (
                renderBackdrop()
              ) : (
                <View
                  style={[styles.flex, { backgroundColor: backdropColor }]}
                />
              )}
            </BackdropPressableComponent>
          </View>
          <ScrollContextResetter>
            <View
              pointerEvents='box-none'
              style={[styles.content, contentContainerStyle]}
            >
              {children}
            </View>
          </ScrollContextResetter>
        </GestureHandlerRootView>
      </View>
    </RNTModalView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  flex: {
    flex: 1,
  },
  content: {
    zIndex: 1,
    flex: 1,
  },
  backdropContainer: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
} as const);
