import { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Box, Button, Flex } from '@chakra-ui/react';

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  return (
    <Flex position="relative" width="100%" overflow="hidden" textAlign="center">
      <Button
        className="arrow left"
        onClick={prevImage}
        position="absolute"
        top="50%"
        transform="translateY(-50%)"
        left="10px"
        display={['none', 'none', 'block']}
      >
        <BsChevronLeft size={24} />
      </Button>
      <Box flex="1">
        <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} width="100%" height="auto" />
      </Box>
      <Button
        className="arrow right"
        onClick={nextImage}
        position="absolute"
        top="50%"
        transform="translateY(-50%)"
        right="10px"
        display={['none', 'none', 'block']}
      >
        <BsChevronRight size={24} />
      </Button>
    </Flex>
  );
};

export default ImageSlider;
