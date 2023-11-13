import { Box } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

// Define the keyframes animation
const spreadColor = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.4);
    opacity: 0.1;
  }
`;

const MapPoint = () => {
  return (
    <Box
      cursor="pointer"
      role="presentation"
      w="3.6rem"
      h="3.6rem"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: '0.1rem solid rgba(1,82,204,.2)',
        borderRadius: '50%',
        background: 'rgba(1,82,204,.08)',
        boxSizing: 'border-box',
        animation: `${spreadColor} 1.5s infinite`,
      }}
      _after={{
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1rem',
        height: '1rem',
        border: '0.3rem solid',
        borderColor: 'white',
        borderRadius: '50%',
        boxShadow: '0 0 0.5rem 0 rgba(1,82,204,.2)',
        backgroundColor: '#0152cc',
      }}
    />
  );
};

export default MapPoint;
