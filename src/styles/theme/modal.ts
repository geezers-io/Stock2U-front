import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  dialogContainer: {
    px: '8px',
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
