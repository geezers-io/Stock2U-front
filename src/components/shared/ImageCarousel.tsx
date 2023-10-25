import { useState, useCallback, FC, useEffect, useRef } from 'react';
import { Button, Flex, Image } from '@chakra-ui/react';

interface Props {
  images: string[];
}

const ImageCarousel: FC<Props> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const autoSlideIntervalRef = useRef<number>();

  const nextImage = useCallback(() => {
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  }, [images]);

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const stopAutoSlide = useCallback(() => {
    clearInterval(autoSlideIntervalRef.current);
  }, []);

  const startAutoSlide = useCallback(() => {
    autoSlideIntervalRef.current = setInterval(() => {
      nextImage();
    }, 5000);
  }, [nextImage]);

  const resetAutoSlide = () => {
    stopAutoSlide();
    startAutoSlide();
  };

  const handleClickBullet = (index: number) => {
    resetAutoSlide();
    setCurrentImageIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    stopAutoSlide();
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    startAutoSlide();
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
    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, [startAutoSlide, stopAutoSlide]);

  return (
    <Flex
      flexDirection="column"
      gap={2}
      position="relative"
      width="100%"
      overflow="hidden"
      textAlign="center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Flex flex="1" transition="transform 0.3s ease-in-out" transform={`translateX(-${currentImageIndex * 100}%)`}>
        {images.map((image, index) => (
          <Image key={index} src={image} alt={`Slider Image ${index}`} width="100%" height="auto" />
        ))}
      </Flex>
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
