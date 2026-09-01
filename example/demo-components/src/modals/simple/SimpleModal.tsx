import {FC} from 'react';
import {StyleSheet} from 'react-native';
import {ModalView} from 'react-native-multiple-modals';
import {AlertContent} from '../../components/alert-content/AlertContent';
import {BaseModalProps} from '../BaseModal';

type SimpleModalProps = BaseModalProps;

export const SimpleModal: FC<SimpleModalProps> = props => {
  return (
    <ModalView
      onRequestDismiss={props.onRequestDismiss}
      contentContainerStyle={styles.contentContainer}
      statusBar={{
        barStyle: 'light-content',
        translucent: false,
      }}>
      <AlertContent {...props} />
    </ModalView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
