import React, { FC, ReactNode, useEffect } from 'react';

import {
  BackHandler,
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

type BackdropProps = Omit<PressableProps, 'onPress' | 'style'> & {
  style: StyleProp<ViewStyle>;
};

enum DismissalSource {
  BackButton = 'BackButton',
  Backdrop = 'Backdrop',
}

export type ModalViewProps = {
  children: ReactNode;
  renderBackdrop?: () => ReactNode;
  onRequestDismiss?: (calledBy: DismissalSource) => void;
  style?: StyleProp<ViewStyle>;
  backdropProps?: BackdropProps;
};

export const ModalView: FC<ModalViewProps> = ({
  children,
  renderBackdrop,
  onRequestDismiss,
  backdropProps,
  style,
}) => {
  const windowDimensions = useWindowDimensions();
  const fullScreenStyle = [windowDimensions, styles.container];

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      onRequestDismiss?.(DismissalSource.BackButton);
      return true;
    });

    return handler.remove;
  }, [onRequestDismiss]);

  return (
    <View style={fullScreenStyle}>
      <RNTModalView>
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
              style={[windowDimensions, styles.content, style]}
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
