import { FC, ReactNode } from 'react';

import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import { RNTModalView } from './RNTModalView';
import { ScrollContextResetter } from './ScrollContextResetter';

export type BackdropProps = Omit<PressableProps, 'onPress' | 'style'> & {
  style: StyleProp<ViewStyle>;
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
};

export const ModalView: FC<ModalViewProps> = ({
  children,
  renderBackdrop,
  onRequestDismiss,
  backdropProps,
  contentContainerStyle,
}) => {
  const windowDimensions = useWindowDimensions();
  const fullScreenStyle = [windowDimensions, styles.container];

  return (
    <View style={fullScreenStyle}>
      <RNTModalView
        onPressBackAndroid={() =>
          onRequestDismiss?.(DismissalSource.BackButton)
        }
      >
        <View collapsable={false}>
          <View style={fullScreenStyle}>
            {renderBackdrop ? (
              renderBackdrop()
            ) : (
              <Pressable
                onPress={() => onRequestDismiss?.(DismissalSource.Backdrop)}
                accessible
                accessibilityLabel='Backdrop'
                {...backdropProps}
                style={[styles.defaultBackdrop, backdropProps?.style]}
              />
            )}
          </View>
          <ScrollContextResetter>
            <View
              pointerEvents='box-none'
              style={[windowDimensions, styles.content, contentContainerStyle]}
            >
              {children}
            </View>
          </ScrollContextResetter>
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
