import {FC} from 'react';
import {StyleSheet} from 'react-native';
import {ModalView} from 'react-native-multiple-modals';
import {AlertContent} from '../../components/alert-content/AlertContent';
import {BaseModalProps} from '../BaseModal';

type AnimatedFadeModalProps = BaseModalProps;

export const AnimatedFadeModal: FC<AnimatedFadeModalProps> = props => {
  return (
    <ModalView
      onRequestDismiss={props.onRequestDismiss}
      contentContainerStyle={styles.contentContainer}
      animationType="fade"
      statusBar={{
        animated: true,
        barStyle: 'light-content',
        translucent: true,
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
