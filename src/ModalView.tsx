import { FC, ReactNode } from 'react';

import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { ScrollContextResetter } from './ScrollContextResetter';
import { GestureHandlerRootView } from './integrations/GestureHandlerRootView';
import RNTModalView from './newarch/RNTModalViewNativeComponent';
import { useScreenDimensions } from './useScreenDimensions';

export type BackdropProps = Omit<PressableProps, 'onPress' | 'style'> & {
  style?: StyleProp<ViewStyle>;
};

export enum DismissalSource {
  BackButton = 'BackButton',
  Backdrop = 'Backdrop',
}

export type ModalViewProps = {
  children: ReactNode;
  renderBackdrop?: () => ReactNode;
  onRequestDismiss?: (calledBy: DismissalSource) => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
  containerSize?: {
    width: number;
    height: number;
  };
  BackdropPressableComponent?: FC<PressableProps>;
  backdropColor?: string;
};

const backdropAccessibilityLabel = 'Backdrop';
const backdropAccessibilityHint = 'Double-tap to close the modal';
const defaultBackdropColor = 'rgba(0, 0, 0, 0.3)';

export const ModalView: FC<ModalViewProps> = ({
  children,
  renderBackdrop,
  onRequestDismiss,
  contentContainerStyle,
  containerSize,
  BackdropPressableComponent = Pressable,
  backdropColor = defaultBackdropColor,
}) => {
  const screenDimensions = useScreenDimensions();
  const preferredContainerSize = containerSize ?? screenDimensions;

  const fullScreenStyle = [preferredContainerSize, styles.container];

  return (
    <RNTModalView
      style={fullScreenStyle}
      onPressBackAndroid={() => onRequestDismiss?.(DismissalSource.BackButton)}
    >
      <View collapsable={false}>
        <GestureHandlerRootView style={preferredContainerSize}>
          <View style={fullScreenStyle}>
            <BackdropPressableComponent
              accessibilityLabel={backdropAccessibilityLabel}
              accessibilityHint={backdropAccessibilityHint}
              style={styles.backdrop}
              onPress={() => onRequestDismiss?.(DismissalSource.Backdrop)}
            >
              {renderBackdrop ? (
                renderBackdrop()
              ) : (
                <View
                  style={[styles.backdrop, { backgroundColor: backdropColor }]}
                />
              )}
            </BackdropPressableComponent>
          </View>
          <ScrollContextResetter>
            <View
              pointerEvents='box-none'
              style={[
                preferredContainerSize,
                styles.content,
                contentContainerStyle,
              ]}
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
  content: {
    zIndex: 1,
  },
  backdrop: {
    flex: 1,
  },
} as const);
