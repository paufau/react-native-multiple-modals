import {FC} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {ModalView} from 'react-native-multiple-modals';
import {AlertContent} from '../../components/alert-content/AlertContent';
import {useTheme} from '../../theme/colors';
import {BaseModalProps} from '../BaseModal';

type FullScreenNoBackgroundModalProps = BaseModalProps;

export const FullScreenNoBackgroundModal: FC<
  FullScreenNoBackgroundModalProps
> = props => {
  const {colors} = useTheme();
  const isDark = useColorScheme() === 'dark';

  return (
    <ModalView
      onRequestDismiss={props.onRequestDismiss}
      backdropColor={colors.backgroundHighlight}
      contentContainerStyle={styles.contentContainer}
      statusBar={{
        animated: true,
        barStyle: isDark ? 'light-content' : 'dark-content',
        translucent: false,
      }}>
      <AlertContent {...props} />
    </ModalView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
