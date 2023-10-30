import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    display: 'inline-flex',
    alignItems: 'center',
  },
});

export const switchTheme = defineMultiStyleConfig({ baseStyle });
