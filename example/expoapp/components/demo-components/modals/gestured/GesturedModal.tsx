import {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {ModalView} from 'react-native-multiple-modals';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AlertContent} from '../../components/alert-content/AlertContent';
import {BaseModalProps} from '../BaseModal';

type GesturedModalProps = BaseModalProps;

export const GesturedModal: FC<GesturedModalProps> = props => {
  const translation = useSharedValue({x: 0, y: 0});

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      translation.value = {
        x: e.translationX,
        y: e.translationY,
      };
    })
    .onEnd(() => {
      const duration = 200;

      translation.value = {
        x: withTiming(0, {duration}),
        y: withTiming(0, {duration}),
      };
    });

  const animatedModalStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translation.value.x},
      {translateY: translation.value.y},
    ],
  }));

  return (
    <ModalView
      onRequestDismiss={props.onRequestDismiss}
      contentContainerStyle={styles.contentContainer}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedModalStyle}>
          <AlertContent {...props} />
        </Animated.View>
      </GestureDetector>
    </ModalView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
