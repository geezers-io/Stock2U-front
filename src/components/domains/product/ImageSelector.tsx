import { FC, useState, useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { MockProductDetail } from '@/api/__mock__/product';

const ImageSelector: FC = () => {
  const [images, setImages] = useState<MockProductDetail>();

  const fetchImages = async () => {
    try {
      setImages(images);
    } catch (e) {}
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (!images) {
    return null;
  }

  return (
    <Box w="100%" h="100%" display="flex" justifyContent="center" alignItems="center" bgColor={colors.brand[100]}>
      <Flex mb="1rem"></Flex>
    </Box>
  );
};

export default ImageSelector;
