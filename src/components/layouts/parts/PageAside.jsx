import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { APP_STYLES } from '@/styles/theme';

const PageAside = ({ children }) => {
  return (
    <Box
      as="aside"
      width="100%"
      height={APP_STYLES.ASIDE_HEIGHT}
      position="fixed"
      bottom={0}
      boxShadow="0 -2px 2px -2px rgba(0,0,0,.3)"
      backgroundColor="white"
    >
      <Box
        height="100%"
        maxWidth={APP_STYLES.MAX_WIDTH}
        display="flex"
        alignItems="center"
        margin="0 auto"
        padding={`0 ${APP_STYLES.PADDING_X}`}
      >
        {children}
      </Box>
    </Box>
  );
};

PageAside.propTypes = {
  children: PropTypes.node,
};

export default PageAside;
