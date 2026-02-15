import {FC} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {BaseModalProps} from '../BaseModal';
import {Typography} from '../../components/typography/Typography';
import {DocumentationLinkText} from '../../components/documentation-link-text/DocumentationLinkText';
import {Button} from '../../components/button/Button';
import {useTheme} from '../../theme/colors';

type DefaultModalProps = BaseModalProps & {
  onOpenLibraryModal: () => void;
};

export const DefaultModal: FC<DefaultModalProps> = ({
  title,
  testID,
  onRequestDismiss,
  onOpenLibraryModal,
}) => {
  const {colors} = useTheme();

  return (
    <Modal
      onRequestClose={onRequestDismiss}
      transparent={true}
      animationType="none"
      statusBarTranslucent={true}>
      <View style={styles.container} testID={`${testID}-modal`}>
        <View style={styles.backdrop} />
        <View
          style={[
            styles.modal,
            {
              borderColor: colors.cardOutline,
              backgroundColor: colors.background,
            },
          ]}>
          <Typography variant="title" color="primary">
            {title}
          </Typography>
          <DocumentationLinkText />
          <Button onPress={onRequestDismiss} testID={`${testID}-close-button`}>
            Close
          </Button>
          <Button
            onPress={onOpenLibraryModal}
            testID={`${testID}-open-library-button`}>
            Open Library Modal
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modal: {
    width: '80%',
    borderRadius: 24,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: 20,
    gap: 16,
    borderWidth: 1,
    boxShadow: '0 4px 8px rgba(0, 0, 0, .03)',
  },
});
