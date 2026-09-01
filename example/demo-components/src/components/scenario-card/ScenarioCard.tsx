import {Typography} from '../typography/Typography';
import {useTheme} from '../../theme/colors';
import {FC} from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

type ScenarioCardProps = Omit<PressableProps, 'style'> & {
  title: string;
  description: string;
};

export const ScenarioCard: FC<ScenarioCardProps> = ({
  title,
  description,
  ...props
}) => {
  const {colors} = useTheme();
  const isLargeScreen = useWindowDimensions().width > 600;

  return (
    <Pressable
      {...props}
      style={[
        styles.cardContainer,
        {
          maxWidth: isLargeScreen ? 240 : 360,
          borderColor: colors.cardOutline,
          backgroundColor: colors.cardBackground,
        },
      ]}>
      <Typography style={styles.title}>{title}</Typography>
      <Typography color="secondary">{description}</Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    boxShadow: '0 4px 8px rgba(0, 0, 0, .03)',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});
