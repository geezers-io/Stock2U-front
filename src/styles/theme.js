import { extendTheme } from '@chakra-ui/react';

const config = {};

const theme = extendTheme({
  config,
  colors: {
    black: '#000000',
    white: '#ffffff',
  },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", Pretendard, Roboto, "Noto Sans KR", "Segoe UI", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
  },
  styles: {
    global: {
      html: {},
      body: {},
      '#root': {},
    },
  },
});

export default theme;
