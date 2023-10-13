import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  white: '#ffffff',
  black: '#000000',
  success: '#4CAF50',
  error: '#DC3545',
  brand: {
    50: '#def3ff',
    100: '#b0d8ff',
    200: '#80beff',
    300: '#50a4fe',
    400: '#258bfc',
    500: '#1371e4',
    600: '#0758b2',
    700: '#003f80',
    800: '#00264f',
    900: '#000e1f',
  },
  accent: {
    50: '#FFFFE6',
    100: '#FFFFB3',
    200: '#FFFF80',
    300: '#FFFF4D',
    400: '#FFDA1A',
    500: '#FFC000',
    600: '#E5A600',
    700: '#B27300',
    800: '#7F4000',
    900: '#4C0D00',
  },
  gray: {
    50: '#f2f2f2',
    100: '#d9d9d9',
    200: '#bfbfbf',
    300: '#a6a6a6',
    400: '#8c8c8c',
    500: '#737373',
    600: '#595959',
    700: '#404040',
    800: '#262626',
    900: '#0d0d0d',
  },
} as const;

export const APP_STYLES = {
  MAX_WIDTH: '768px',
  PADDING_X: '12px',
  HEADER_HEIGHT: { base: '48px', md: '56px' },
  ASIDE_HEIGHT: '56px',
} as const;
const styles = {
  global: {
    body: {
      width: '100%',
      minHeight: '100vh',
      color: 'gray.900',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", Pretendard, Roboto, "Noto Sans KR", "Segoe UI", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
    },
    '#root': {
      width: '100%',
      minHeight: '100vh',
      background: 'gray.50',
    },
    main: {
      width: '100%',
      minHeight: {
        base: `calc(100vh - ${APP_STYLES.HEADER_HEIGHT.base})`,
        md: `calc(100vh - ${APP_STYLES.HEADER_HEIGHT.md})`,
      },
      maxWidth: APP_STYLES.MAX_WIDTH,
      margin: '0 auto',
      background: 'white',
      paddingBottom: '13.6rem',
      padding: `0 ${APP_STYLES.PADDING_X}`,
    },
  },
};

const theme = extendTheme({
  config,
  colors,
  styles,
});

export default theme;