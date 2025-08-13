import { FC } from 'react';
import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { ScrollContextResetter } from './ScrollContextResetter';
import { GestureHandlerRootView } from './integrations/GestureHandlerRootView';
import RNTModalView from './newarch/NativeRNTModalView';

import type { ModalViewProps } from './index.d';

export enum DismissalSource {
  BackButton = 'BackButton',
  Backdrop = 'Backdrop',
}

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
