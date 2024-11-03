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
  backdropProps?: BackdropProps;
  containerSize?: {
    width: number;
    height: number;
  };
};

const backdropAccessibilityLabel = 'Backdrop';
const backdropAccessibilityHint = 'Double-tap to close the modal';

export const ModalView: FC<ModalViewProps> = ({
  children,
  renderBackdrop,
  onRequestDismiss,
  backdropProps,
  contentContainerStyle,
  containerSize,
}) => {
  const screenDimensions = useScreenDimensions();
  const preferredContainerSize = containerSize ?? screenDimensions;

  const fullScreenStyle = [preferredContainerSize, styles.container];

  return (
    <View style={fullScreenStyle}>
      <RNTModalView
        onPressBackAndroid={() =>
          onRequestDismiss?.(DismissalSource.BackButton)
        }
      >
        <View collapsable={false}>
          <GestureHandlerRootView>
            <View style={fullScreenStyle}>
              {renderBackdrop ? (
                renderBackdrop()
              ) : (
                <Pressable
                  accessibilityLabel={backdropAccessibilityLabel}
                  accessibilityHint={backdropAccessibilityHint}
                  {...backdropProps}
                  onPress={() => onRequestDismiss?.(DismissalSource.Backdrop)}
                  style={[styles.defaultBackdrop, backdropProps?.style]}
                />
              )}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  content: {
    zIndex: 1,
  },
  defaultBackdrop: {
    flex: 1,
    zIndex: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
} as const);
