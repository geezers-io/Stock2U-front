import { useState, useCallback, FC, useEffect } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Box, Button, Flex, Image } from '@chakra-ui/react';

interface Props {
  images: string[];
}

const ImageCarousel: FC<Props> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  }, [images]);

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const handleTouch = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    const threshold = 50;

    if (deltaX > threshold) {
      prevImage();
    } else if (deltaX < -threshold) {
      nextImage();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [images, nextImage]);

  return (
    <Flex
      position="relative"
      width="100%"
      overflow="hidden"
      textAlign="center"
      onTouchStart={handleTouch}
      onTouchEnd={handleTouchEnd}
    >
      <Box
        flex="1"
        transition="transform 0.5s ease-in-out"
        transform={`translateX(-${currentImageIndex * 100}%)`}
        display="flex"
      >
        {images.map((image, index) => (
          <Image key={index} src={image} alt={`Slider Image ${index}`} width="100%" height="auto" />
        ))}
      </Box>

      <Button
        onClick={prevImage}
        position="absolute"
        top="45%"
        transform="translateY(0)"
        left="10px"
        display={{ base: 'none', md: 'block' }}
      >
        <BsChevronLeft size={24} />
      </Button>

      <Button
        onClick={nextImage}
        position="absolute"
        top="45%"
        transform="translateY(0)"
        right="10px"
        display={{ base: 'none', md: 'block' }}
      >
        <BsChevronRight size={24} />
      </Button>
    </Flex>
  );
};

export default ImageCarousel;
