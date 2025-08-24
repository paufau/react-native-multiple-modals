import { useMemo } from 'react';
import type { FC } from 'react';

import { createPortal } from 'react-dom';
import { StyleSheet, View, Pressable } from 'react-native';

import { useID } from './hooks/useID';
import { useModalRegistry } from './hooks/useModalRegistry';
import type { ModalViewProps } from './types';

export type ModalViewWebProps = Omit<
  ModalViewProps,
  'statusBar' | 'disableDefaultStatusBarIOS' | 'statusBarTranslucent'
> & {
  modalId?: string;
};

const backdropAccessibilityLabel = 'Backdrop';
const backdropAccessibilityHint = 'Double-tap to close the modal';
const defaultBackdropColor = 'rgba(0, 0, 0, 0.3)';

export enum DismissalSource {
  BackButton = 'BackButton',
  Backdrop = 'Backdrop',
}

export const ModalView: FC<ModalViewWebProps> = ({
  modalId,
  children,
  renderBackdrop,
  onRequestDismiss,
  contentContainerStyle,
  BackdropPressableComponent = Pressable,
  backdropColor = defaultBackdropColor,
  animationType = 'none',
}) => {
  const currentModalId = useID(modalId);
  const { modals, isBackdropVisible } = useModalRegistry(currentModalId);
  const modalIsOpen = modals.has(currentModalId);

  const animatedStyle = useMemo(() => {
    if (animationType === 'fade') {
      return {
        opacity: modalIsOpen ? 1 : 0,
        transition: 'opacity 0.3s',
      };
    }
    if (animationType === 'slide') {
      return {
        transform: modalIsOpen ? 'translateY(0)' : 'translateY(100%)',
        opacity: modalIsOpen ? 1 : 0,
        transition: 'transform 0.3s, opacity 0.3s',
      };
    }

    return {};
  }, [animationType, modalIsOpen]);

  return createPortal(
    <View style={[styles.backdropContainer]}>
      <BackdropPressableComponent
        accessibilityLabel={backdropAccessibilityLabel}
        accessibilityHint={backdropAccessibilityHint}
        style={[
          styles.backdropPressable,
          !isBackdropVisible && styles.backdropHidden,
        ]}
        onPress={() => onRequestDismiss?.(DismissalSource.Backdrop)}
      >
        {renderBackdrop ? (
          renderBackdrop()
        ) : (
          <View style={[styles.flex, { backgroundColor: backdropColor }]} />
        )}
      </BackdropPressableComponent>

      <View
        accessibilityRole='dialog'
        pointerEvents='box-none'
        style={[styles.content, animatedStyle, contentContainerStyle]}
      >
        {children}
      </View>
    </View>,
    document.body,
  );
};

const styles = StyleSheet.create({
  backdropPressable: {
    flex: 1,
    opacity: 1,
    alignSelf: 'stretch',
  },
  backdropHidden: {
    opacity: 0,
  },
  flex: {
    flex: 1,
  },
  content: {
    alignSelf: 'center',
    flex: 1,
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  backdropContainer: {
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 0,
  },
} as const);
