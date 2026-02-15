import {FC} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {BaseModalProps} from '../../modals/BaseModal';
import {useTheme} from '../../theme/colors';
import {Button} from '../button/Button';
import {DocumentationLinkText} from '../documentation-link-text/DocumentationLinkText';
import {Typography} from '../typography/Typography';

type AlertContentProps = {
  style?: StyleProp<ViewStyle>;
} & BaseModalProps;

export const AlertContent: FC<AlertContentProps> = ({
  onRequestDismiss,
  testID,
  title,
  style,
}) => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.modal,
        {
          borderColor: colors.cardOutline,
          backgroundColor: colors.background,
        },
        style,
      ]}
      testID={`${testID}-modal`}>
      <Typography variant="title" color="primary">
        {title}
      </Typography>

      <DocumentationLinkText />

      <Button onPress={onRequestDismiss} testID={`${testID}-close-button`}>
        Close
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
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
