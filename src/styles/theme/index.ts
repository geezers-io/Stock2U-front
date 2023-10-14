import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { colors } from './@colors';
import { buttonTheme } from './button';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

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
  components: { Button: buttonTheme },
});

export default theme;
