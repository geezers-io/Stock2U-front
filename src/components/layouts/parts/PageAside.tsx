import { FC, PropsWithChildren } from 'react';
import { Box } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';

const PageAside: FC<PropsWithChildren> = ({ children }) => {
  const { appStyles } = useTheme();

  return (
    <Box
      as="aside"
      w="100%"
      h={appStyles.asideHeight}
      position="fixed"
      bottom={0}
      boxShadow="0 -2px 2px -2px rgba(0,0,0,.3)"
      backgroundColor="white"
    >
      <Box
        h="100%"
        maxW={appStyles.maxWidth}
        display="flex"
        alignItems="center"
        margin="0 auto"
        padding={`0 ${appStyles.paddingX}`}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageAside;
