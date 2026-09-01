import {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ModalView} from 'react-native-multiple-modals';
import {Button} from '../../components/button/Button';
import {useTheme} from '../../theme/colors';
import {BaseModalProps} from '../BaseModal';
import {Typography} from '../../components/typography/Typography';
import {AlertContent} from '../../components/alert-content/AlertContent';

type EmbeddedModalProps = BaseModalProps;

export const EmbeddedModal: FC<EmbeddedModalProps> = ({
  onRequestDismiss,
  testID,
  title,
}) => {
  const {colors} = useTheme();
  const [isVisible, setVisibility] = useState(false);

  return (
    <ModalView
      statusBar={{
        translucent: true,
        barStyle: 'dark-content',
      }}
      animationType="slide"
      onRequestDismiss={onRequestDismiss}
      contentContainerStyle={styles.contentContainer}>
      <View
        testID={`${testID}-modal`}
        style={[
          styles.modal,
          {
            backgroundColor: colors.background,
            borderColor: colors.cardOutline,
          },
        ]}>
        <Text style={[styles.title, {color: colors.textPrimary}]}>{title}</Text>
        <View style={styles.leftRightContainer}>
          <Typography variant="body">Left</Typography>
          <Typography variant="body">Right</Typography>
          {isVisible ? (
            <ModalView contentContainerStyle={styles.innerContentContainer}>
              <AlertContent
                title={`${title} Alert`}
                testID={`${title}-alert-content`}
                onRequestDismiss={() => {
                  setVisibility(false);
                }}
              />
            </ModalView>
          ) : null}
        </View>
        <View style={styles.buttons}>
          <Button testID={`${testID}-close-button`} onPress={onRequestDismiss}>
            Close
          </Button>
          <Button
            testID={`${testID}-open-animated-button`}
            onPress={() => {
              setVisibility(true);
            }}>
            Open Another
          </Button>
        </View>
      </View>
    </ModalView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-end',
  },
  innerContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
  leftRightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
});
