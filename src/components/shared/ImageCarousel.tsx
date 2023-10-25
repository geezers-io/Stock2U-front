import { useState, useCallback, FC, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { css, useTheme } from '@emotion/react';

interface Props {
  images: string[];
}

const ImageCarousel: FC<Props> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const autoSlideIntervalRef = useRef<number>();
  const theme = useTheme();

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

  const handleClickChevron = (to: 'prev' | 'next') => {
    resetAutoSlide();
    if (to === 'prev') prevImage();
    if (to === 'next') nextImage();
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
      position="relative"
      width="100%"
      overflow="hidden"
      textAlign="center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      css={css`
        @media (min-width: ${theme.breakpoints.md}) {
          &:hover > .slider-float-buttons {
            display: block;
          }
        }
      `}
    >
      <Flex flex="1" transition="transform 0.3s ease-in-out" transform={`translateX(-${currentImageIndex * 100}%)`}>
        {images.map((image, index) => (
          <Image key={index} src={image} alt={`Slider Image ${index}`} width="100%" height="auto" />
        ))}
      </Flex>

      {/* 하단 불릿 버튼 */}
      <Flex display={{ base: 'none', md: 'flex' }} justifyContent="center" gap={1} mt={2}>
        {Array.from({ length: images.length }).map((_, index) => {
          const isCurrImage = index === currentImageIndex;
          return (
            <Button
              key={images[index]}
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

      {/* float 버튼 (within hover) */}
      <Box className="slider-float-buttons" display="none">
        <Button
          onClick={() => handleClickChevron('prev')}
          position="absolute"
          top="45%"
          transform="translateY(0)"
          left="10px"
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          onClick={() => handleClickChevron('next')}
          position="absolute"
          top="45%"
          transform="translateY(0)"
          right="10px"
        >
          <ChevronRight size={24} />
        </Button>
      </Box>
    </Flex>
  );
};

export default ImageCarousel;
