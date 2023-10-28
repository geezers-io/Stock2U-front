import { sliderAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  thumb: {
    boxSize: 6,
    boxShadow: '0 0.1rem 0.2rem 0 rgba(0,0,0,.15)',
    border: '0.05rem solid #ccc',
    backgroundColor: '#fefefe',
  },
  track: {
    h: 1.5,
  },
});

export const rangeSliderTheme = defineMultiStyleConfig({ baseStyle });
