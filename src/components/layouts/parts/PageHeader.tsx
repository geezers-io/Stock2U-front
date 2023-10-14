import { FC, PropsWithChildren } from 'react';
import { Box } from '@chakra-ui/react';
import { APP_STYLES } from '@/styles/theme';

const PageHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      as="header"
      w="100%"
      h={APP_STYLES.HEADER_HEIGHT}
      position="sticky"
      top={0}
      paddingTop={{ base: 0, md: '8px' }}
      boxShadow="0 2px 2px -2px rgba(0,0,0,.3)"
      backgroundColor="white"
      zIndex={999}
    >
      <Box
        height="100%"
        maxWidth={APP_STYLES.MAX_WIDTH}
        display="flex"
        alignItems="center"
        margin="0 auto"
        padding={`0 calc(${APP_STYLES.PADDING_X} - 6px)`}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageHeader;
