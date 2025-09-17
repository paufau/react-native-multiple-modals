import { FC, useContext } from 'react';

import { Platform, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import AppContainer from 'react-native/Libraries/ReactNative/AppContainer';
import { RootTagContext } from 'react-native/Libraries/ReactNative/RootTag';

import { ScrollContextResetter } from './ScrollContextResetter';
import { GestureHandlerRootView } from './integrations/GestureHandlerRootView';
import RNTModalView from './newarch/NativeRNTModalView';
import type { ModalViewProps } from './types';

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
  const rootTag = useContext(RootTagContext);

  // Wrap the children in AppContainer so the React Native inspector works
  // within the modal. See https://github.com/facebook/react-native/blob/v0.81.4/packages/react-native/Libraries/Modal/Modal.js#L308
  // for the inspiration within the RN Modal component.
  const innerChildren = __DEV__ ? (
    <AppContainer rootTag={rootTag}>{children}</AppContainer>
  ) : (
    children
  );

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
              {innerChildren}
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
