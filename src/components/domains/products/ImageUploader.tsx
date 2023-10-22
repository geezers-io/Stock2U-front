import { FC, useState } from 'react';
import { Flex } from '@chakra-ui/react';

const ImageUploader: FC = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const images = [
    'https://cdn.mindgil.com/news/photo/202005/69269_3261_1638.jpg',
    'https://gongbuhae.com/storage/app/public/editor/3a/e5/20211123180357accf102caaa970ce65d217b9ae9a8e9a57caa67c.jpg',
    'https://m.damggo.com/web/product/big/202208/c2f36c7d36943b4cad5ecf2c857efaac.jpg',
  ];
  const handleImageClick = (focusImage: string) => {
    setIsZoomed(true);
    setSelectedImage(focusImage);
  };

  const handleCloseZoom = () => {
    setIsZoomed(false);
    setSelectedImage(null);
  };
  // src={URL.createObjectURL(file)}

  return (
    <Flex flexDirection="row" display="inline-flex" flexWrap="wrap" w="50%">
      <div style={{ display: 'flex' }}>
        {images.map((focusImage, index) => (
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
            width: '100%',
            height: '100%',
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

export default ImageUploader;
