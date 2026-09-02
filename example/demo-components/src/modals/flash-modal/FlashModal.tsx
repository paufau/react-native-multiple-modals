import { FC, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ModalView } from 'react-native-multiple-modals';
import { Button } from '../../components/button/Button';
import { useTheme } from '../../theme/colors';
import { BaseModalProps } from '../BaseModal';

export const FlashModal: FC<BaseModalProps> = ({
  onRequestDismiss,
  testID,
  title,
}) => {
  const { colors } = useTheme();
  const [isLoading, setLoading] = useState(false);

  const flash = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 0);
  };

  return (
    <ModalView
      onRequestDismiss={onRequestDismiss}
      contentContainerStyle={styles.contentContainer}
    >
      <View
        testID={`${testID}-modal`}
        style={[
          styles.modal,
          {
            backgroundColor: colors.background,
            borderColor: colors.cardOutline,
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          {title}
        </Text>
        <View style={styles.buttons}>
          <Button testID={`${testID}-flash-button`} onPress={flash}>
            Flash
          </Button>
          <Button testID={`${testID}-close-button`} onPress={onRequestDismiss}>
            Close
          </Button>
        </View>
      </View>

      {isLoading ? (
        <ModalView contentContainerStyle={styles.contentContainer}>
          <ActivityIndicator size='large' color={colors.textPrimary} />
        </ModalView>
      ) : null}
    </ModalView>
  );
};

const styles = StyleSheet.create({
  contentContainer: { alignItems: 'center', justifyContent: 'center' },
  modal: {
    width: '80%',
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    gap: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '500',
  },
  buttons: { gap: 16 },
});
