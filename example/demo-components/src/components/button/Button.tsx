import {FC, ReactNode} from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../theme/colors';
import {Typography} from '../../components/typography/Typography';

type ButtonProps = Omit<PressableProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
  children: string | ReactNode;
};

export const Button: FC<ButtonProps> = ({children, ...props}) => {
  const {colors} = useTheme();

  return (
    <Pressable
      {...props}
      disabled={!props.onPress}
      style={({pressed}) => [
        styles.button,
        props.style,
        pressed && styles.buttonPressed,
        {
          backgroundColor: colors.textPrimary,
        },
      ]}>
      {typeof children === 'string' ? (
        <Typography style={[styles.title, {color: colors.background}]}>
          {children}
        </Typography>
      ) : (
        children
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  buttonPressed: {
    opacity: 0.4,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
  },
});
