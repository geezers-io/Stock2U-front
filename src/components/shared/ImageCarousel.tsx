import { useState, useCallback, FC, useEffect } from 'react';
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

  const handleClickBullet = (index: number) => {
    setCurrentImageIndex(index);
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
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [images, nextImage]);

  return (
    <Flex
      flexDirection="column"
      gap={2}
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
      <Flex display={{ base: 'none', md: 'flex' }} justifyContent="center" gap={1}>
        {Array.from({ length: images.length }).map((_, index) => {
          const isCurrImage = index === currentImageIndex;
          return (
            <Button
              variant="unstyled"
              onClick={() => handleClickBullet(index)}
              w={isCurrImage ? '1.33rem' : '0.66rem'}
              h="0.66rem"
              minW="unset"
              borderRadius={isCurrImage ? '2rem' : '50%'}
              backgroundColor={isCurrImage ? 'gray.400' : 'gray.200'}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default ImageCarousel;
