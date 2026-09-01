import {useTheme} from '../../theme/colors';
import {FC} from 'react';
import {Text, TextProps} from 'react-native';

type TypographyProps = {
  variant?: 'body' | 'title';
  color?: 'primary' | 'secondary';
} & TextProps;

export const Typography: FC<TypographyProps> = ({
  color,
  variant,
  style,
  ...props
}) => {
  const {colors} = useTheme();

  return (
    <Text
      style={[
        {
          color:
            color === 'secondary' ? colors.textSecondary : colors.textPrimary,
        },
        variant === 'title' ? styles.title : styles.body,
        style,
      ]}
      {...props}
    />
  );
};

const styles = {
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '500',
  },
};
