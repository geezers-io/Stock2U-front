import '@emotion/react';
import type { TAppStyles, TColors } from '@/styles/theme';

declare module '@emotion/react' {
  interface Theme {
    colors: TColors;
    appStyles: TAppStyles;
    breakpoints: {
      base: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
  }
}
