import { FC, PropsWithChildren } from 'react';
import { Box } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';

const PageHeader: FC<PropsWithChildren> = ({ children }) => {
  const { appStyles } = useTheme();

  return (
    <Box
      as="header"
      w="100%"
      h={appStyles.headerHeight}
      position="sticky"
      top={0}
      paddingTop={{ base: 0, md: '8px' }}
      boxShadow="0 2px 2px -2px rgba(0,0,0,.3)"
      backgroundColor="white"
      zIndex={999}
    >
      <Box
        h="100%"
        maxW={appStyles.maxWidth}
        display="flex"
        alignItems="center"
        margin="0 auto"
        padding={`0 calc(${appStyles.paddingX} - 6px)`}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageHeader;
