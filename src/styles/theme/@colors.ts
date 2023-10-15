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
  sub: {
    50: '#fde3ff',
    100: '#edb2ff',
    200: '#df7fff',
    300: '#d14cff',
    400: '#c41aff',
    500: '#aa00e6',
    600: '#8400b4',
    700: '#600082',
    800: '#3a0050',
    900: '#16001f',
  },
  gray: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },
  success: generateSameColorScale('#4CAF50'),
  error: generateSameColorScale('#DC3545'),
  white: '#ffffff',
  black: '#000000',
} as const;
