import React, {FC, ReactNode} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {RNTModalView} from './RNTModalView';

export type ModalViewProps = {
  children: ReactNode;
  renderBackdrop?: () => ReactNode;
  onRequestDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
  backdropProps?: ViewProps;
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

  // TODO ADD
  /* <VirtualizedListContextResetter>
<ScrollView.Context.Provider value={null}>
  <View
    style={[styles.container, containerStyles]}
    collapsable={false}>
    {innerChildren}
  </View>
</ScrollView.Context.Provider>
</VirtualizedListContextResetter> */

  return (
    <View style={fullScreenStyle}>
      <RNTModalView>
        <View collapsable={false}>
          <View style={fullScreenStyle}>
            {renderBackdrop ? (
              renderBackdrop()
            ) : (
              <Pressable
                onPress={onRequestDismiss}
                accessible
                accessibilityLabel="Backdrop"
                {...backdropProps}
                style={[styles.defaultBackdrop, backdropProps?.style]}
              />
            )}
          </View>
          <View
            pointerEvents="box-none"
            style={[windowDimensions, styles.content, style]}>
            {children}
          </View>
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
