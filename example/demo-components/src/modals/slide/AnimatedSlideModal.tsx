import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { ModalView } from 'react-native-multiple-modals';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AlertContent } from '../../components/alert-content/AlertContent';
import { BaseModalProps } from '../BaseModal';

type AnimatedSlideModalProps = BaseModalProps;

export const AnimatedSlideModal: FC<AnimatedSlideModalProps> = props => {
  const insets = useSafeAreaInsets();

  return (
    <ModalView
      onRequestDismiss={props.onRequestDismiss}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: insets.bottom },
      ]}
      animationType='slide'
    >
      <AlertContent {...props} style={styles.modal} />
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
    borderRadius: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
});
