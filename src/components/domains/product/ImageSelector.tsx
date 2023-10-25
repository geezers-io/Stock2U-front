import { FC, useEffect, useState } from 'react';
import { Flex, Image } from '@chakra-ui/react';
import { mockProductDetail, MockProductDetail } from '@/api/__mock__/product';

const ImageSelector: FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageData, setImageData] = useState<MockProductDetail>(mockProductDetail);

  const fetchImages = async () => {
    try {
      setImageData(prev => ({
        ...prev,
        subImageUrls: prev.subImageUrls,
      }));
    } catch (e) {}
  };
  useEffect(() => {
    fetchImages();
  }, []);

  if (!imageData) {
    return null;
  }

  const handleImageClick = (focusImage: string) => {
    setSelectedImage(focusImage);
  };

  const handleCloseZoom = () => {
    setSelectedImage(null);
  };

  return (
    <Flex flexDirection="row" display="inline-flex" flexWrap="wrap" w="50%" justify-content="center">
      <Flex>
        {imageData.subImageUrls.map((focusImage, index) => (
          <Image
            key={index}
            src={focusImage}
            onClick={() => handleImageClick(focusImage)} //새로운 함수 생성하여 전달
            cursor="pointer"
            maxWidth="100px"
            margin="10px"
            aspectRatio="1/1"
            objectFit="contain"
          />
        ))}
      </Flex>

      {selectedImage && <Image role="button" src={selectedImage} w="100%" h="auto" onClick={handleCloseZoom} />}
    </Flex>
  );
};

export default ImageSelector;
