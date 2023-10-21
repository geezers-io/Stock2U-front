import { FC, useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { mockProductDetail, MockProductDetail } from '@/api/__mock__/product';

const ImageSelector: FC = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // TO HEEJUNG: 배열로 관리하는 상태라면 초기 값이 [](empty array) 인 것이 관리하기 편합니다. ( 번거로운 intialize 과정을 선언과 동시에 )
  const [imageData, setImageData] = useState<MockProductDetail>(mockProductDetail);

  const fetchImages = async () => {
    try {
      // TO HEEJUNG 상태가 배열이므로 현 상태에 새로운 상태를 concatnate 를 수행해서 반환하여 추가 데이터를 생성합니다.
      setImageData(prev => ({
        ...prev,
        subImageUrls: prev.subImageUrls.concat(mockProductDetail.subImageUrls[0]),
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
