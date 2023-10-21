import { FC, useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { MockProductDetail } from '@/api/__mock__/product';

const ImageSelector: FC = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageData, setImageData] = useState<MockProductDetail>();
  const fetchImages = async () => {
    try {
      setImageData(imageData);
    } catch (e) {}
  };
  useEffect(() => {
    fetchImages();
  }, []);

  if (!imageData) {
    return null;
  }

  const handleImageClick = (focusImage: string) => {
    setIsZoomed(true);
    setSelectedImage(focusImage);
  };

  const handleCloseZoom = () => {
    setIsZoomed(false);
    setSelectedImage(null);
  };

  return (
    <Flex flexDirection="row" display="inline-flex" flexWrap="wrap" w="50%">
      <div style={{ display: 'flex' }}>
        {imageData.subImageUrls.map((focusImage, index) => (
          <img
            key={index}
            src={focusImage}
            onClick={() => handleImageClick(focusImage)} //새로운 함수 생성하여 전달
            style={{ cursor: 'pointer', maxWidth: '100px', margin: '10px' }}
          />
        ))}
      </div>

      {isZoomed && selectedImage && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleCloseZoom} //직접 호출
        >
          <img src={selectedImage} style={{ maxWidth: '80%', maxHeight: '80%' }} />
        </div>
      )}
    </Flex>
  );
};

export default ImageSelector;
