import { FC, useState } from 'react';
import { Flex } from '@chakra-ui/react';

const ImageSelector: FC = () => {
  /*const [images, setImages] = useState<MockProductDetail>();

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

  
*/
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const images = [
    'https://cdn.mindgil.com/news/photo/202005/69269_3261_1638.jpg',
    'https://gongbuhae.com/storage/app/public/editor/3a/e5/20211123180357accf102caaa970ce65d217b9ae9a8e9a57caa67c.jpg',
    'https://m.damggo.com/web/product/big/202208/c2f36c7d36943b4cad5ecf2c857efaac.jpg',
  ];

  const handleImageClick = (imageUrl: string) => {
    setIsZoomed(true);
    setSelectedImage(imageUrl);
  };

  const handleCloseZoom = () => {
    setIsZoomed(false);
    setSelectedImage(null);
  };

  return (
    <Flex flexDirection="row" display="inline-flex" flexWrap="wrap" w="50%">
      <div style={{ display: 'flex' }}>
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`이미지 ${index}`}
            onClick={() => handleImageClick(imageUrl)}
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
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleCloseZoom}
        >
          <img src={selectedImage} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
        </div>
      )}
    </Flex>
  );
};

export default ImageSelector;
