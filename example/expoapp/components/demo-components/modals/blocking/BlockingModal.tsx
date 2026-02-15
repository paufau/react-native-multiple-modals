import {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ModalView} from 'react-native-multiple-modals';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import {Button} from '../../components/button/Button';
import {useTheme} from '../../theme/colors';
import {BaseModalProps} from '../BaseModal';

type BlockingModalProps = {
  onOpenAnother: () => void;
} & BaseModalProps;

export const BlockingModal: FC<BlockingModalProps> = ({
  onRequestDismiss,
  onOpenAnother,
  testID,
  title,
}) => {
  const {colors} = useTheme();
  const [isVisible, setVisibility] = useState(true);

  const hide = () => {
    setVisibility(false);
    setTimeout(onRequestDismiss, 500);
  };

  return (
    <ModalView
      statusBar={{
        translucent: true,
        barStyle: 'dark-content',
      }}
      contentContainerStyle={styles.contentContainer}
      renderBackdrop={() =>
        isVisible ? (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.backdrop}
          />
        ) : null
      }>
      {isVisible ? (
        <Animated.View
          testID={`${testID}-modal`}
          entering={SlideInDown}
          exiting={SlideOutDown}
          style={[
            styles.modal,
            {
              backgroundColor: colors.background,
              borderColor: colors.cardOutline,
            },
          ]}>
          <Text style={[styles.title, {color: colors.textPrimary}]}>
            {title}
          </Text>
          <View style={styles.buttons}>
            <Button testID={`${testID}-close-button`} onPress={hide}>
              Close
            </Button>
            <Button
              testID={`${testID}-open-animated-button`}
              onPress={onOpenAnother}>
              Open Another
            </Button>
          </View>
        </Animated.View>
      ) : null}
    </ModalView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-end',
    width: '100%',
  },
  modal: {
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    minHeight: 300,
    alignItems: 'stretch',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '500',
  },
  buttons: {
    marginTop: 32,
    gap: 16,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
