import { generateSameColorScale } from '@/utils/color';

/**
 * @description
 * Chakra 컴포넌트가 보통 아래와 같이 컬러를 씀
 *  200 - border color
 *  600 - bg color
 */

export const colors = {
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
  success: generateSameColorScale('#4CAF50'),
  error: generateSameColorScale('#DC3545'),
  white: '#ffffff',
  black: '#000000',
} as const;
