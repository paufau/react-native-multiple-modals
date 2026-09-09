import { useEffect, useId } from 'react';
import type { FC } from 'react';

import { createPortal } from 'react-dom';
import { StyleSheet, View, Pressable } from 'react-native';

import { FocusBracket } from './FocusBracket';
import { useFocusTrap } from './hooks/useFocusTrap';
import { useModalAnimation } from './hooks/useModalAnimation';
import { useModalStack } from './hooks/useModalStack';
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

const MODAL_Z_INDEX = 10000; // react-native-web's default <Modal> renders at zIndex 9999

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
  showBackdrop = true,
  BackdropPressableComponent = Pressable,
  backdropColor = defaultBackdropColor,
  animationType = 'none',
}) => {
  const reactId = useId();
  const currentModalId = modalId ?? reactId;
  const { isTopmost } = useModalStack(currentModalId);

  const contentRef = useFocusTrap(isTopmost);
  const { setContainerRef, animatedStyle } = useModalAnimation(
    animationType,
    contentRef,
  );

  useEffect(() => {
    if (!isTopmost || !onRequestDismiss) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onRequestDismiss(DismissalSource.BackButton);
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isTopmost, onRequestDismiss]);

  // renders nothing on server side
  // typically "document" is undeclared on the server
  // and "typeof" can safely touch undeclared variables without throwing
  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <View
      ref={setContainerRef}
      pointerEvents='box-none'
      style={styles.container}
    >
      {showBackdrop && (
        <BackdropPressableComponent
          accessibilityLabel={backdropAccessibilityLabel}
          accessibilityHint={backdropAccessibilityHint}
          style={styles.backdropPressable}
          onPress={() => onRequestDismiss?.(DismissalSource.Backdrop)}
        >
          {renderBackdrop ? (
            renderBackdrop()
          ) : (
            <View style={[styles.flex, { backgroundColor: backdropColor }]} />
          )}
        </BackdropPressableComponent>
      )}

      <FocusBracket />
      <View
        ref={contentRef}
        role='dialog'
        aria-modal={true}
        tabIndex={-1}
        pointerEvents='box-none'
        style={[styles.content, animatedStyle, contentContainerStyle]}
      >
        {children}
      </View>
      <FocusBracket />
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
  container: {
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: MODAL_Z_INDEX,
  },
} as const);
