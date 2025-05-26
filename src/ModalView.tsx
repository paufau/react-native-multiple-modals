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

export type StatusBarIconsStyle = 'light' | 'dark';

export type ModalViewProps = {
  children: ReactNode;
  renderBackdrop?: () => ReactNode;
  onRequestDismiss?: (calledBy: DismissalSource) => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
  statusBarTranslucent?: boolean;
  statusBarIconsStyle?: StatusBarIconsStyle;
  disableDefaultStatusBarIOS?: boolean;
  BackdropPressableComponent?: FC<PressableProps>;
  backdropColor?: string;
};

const backdropAccessibilityLabel = 'Backdrop';
const backdropAccessibilityHint = 'Double-tap to close the modal';
const defaultBackdropColor = 'rgba(0, 0, 0, 0.3)';

const iconsStyleToNativeBarStyle: Record<
  StatusBarIconsStyle,
  StatusBarProps['barStyle']
> = {
  light: 'light-content',
  dark: 'dark-content',
};

export const ModalView: FC<ModalViewProps> = ({
  children,
  renderBackdrop,
  onRequestDismiss,
  contentContainerStyle,
  statusBarTranslucent,
  statusBarIconsStyle,
  BackdropPressableComponent = Pressable,
  backdropColor = defaultBackdropColor,
  disableDefaultStatusBarIOS = false,
}) => {
  return (
    <RNTModalView
      style={styles.container}
      statusBarTranslucent={statusBarTranslucent}
      statusBarIconsStyle={statusBarIconsStyle}
      onPressBackAndroid={() => onRequestDismiss?.(DismissalSource.BackButton)}
    >
      {Platform.OS === 'ios' && !disableDefaultStatusBarIOS ? (
        <StatusBar
          barStyle={
            statusBarIconsStyle
              ? iconsStyleToNativeBarStyle[statusBarIconsStyle]
              : 'default'
          }
        />
      ) : null}
      <View collapsable={false} style={styles.flex}>
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
  // TODO remove before release
  flexDebug: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'cyan',
  },
} as const);
