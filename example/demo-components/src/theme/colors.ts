import {useColorScheme} from 'react-native';

export const COLORS = {
  while: '#ffffff',
  background: 'rgba(242, 242, 247, 1)',
  grayDark: 'rgba(28, 28, 30, 1)',
  buttons: {
    primary: 'rgba(0, 132, 255, 1)',
  },
} as const;

const THEMED_COLORS = {
  light: {
    background: '#f3f3f3',
    backgroundHighlight: '#cfe6ee',
    cardBackground: '#fff',
    cardOutline: '#dae1e7',
    textPrimary: '#000',
    textSecondary: '#404756',
  },
  dark: {
    background: '#000',
    backgroundHighlight: '#193c47',
    cardBackground: '#222',
    cardOutline: '#444',
    textPrimary: '#fff',
    textSecondary: '#c0c1c4',
  },
};

type Theme = {
  colors: {
    background: string;
    backgroundHighlight: string;
    cardBackground: string;
    cardOutline: string;
    textPrimary: string;
    textSecondary: string;
  };
};

export function useTheme(): Theme {
  const colorScheme = useColorScheme();

  return {
    colors: THEMED_COLORS[colorScheme === 'dark' ? 'dark' : 'light'],
  };
}
