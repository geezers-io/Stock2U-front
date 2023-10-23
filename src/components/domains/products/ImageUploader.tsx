import { FC, useState, useRef, MouseEventHandler, ChangeEventHandler } from 'react';
import { Flex, Button } from '@chakra-ui/react';

const ImageUploader: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  //const [image, setImage] = useState<File>();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [clickImage, setClickImage] = useState<string | null>(null);

  const handleUploadButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    inputRef.current?.click();
  };

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (!event.target.files) return;

    const files = event.target.files;
    const newImages = Array.from(files).slice(0, 5);
    console.log(files);
    if (selectedImages.length + files.length <= 5) {
      setSelectedImages([...selectedImages, ...files]);
    } else {
      alert(`최대 이미지 파일 5개까지만 선택할 수 있습니다. 처음 선택하신 파일 5개만 업로드하겠습니다.`);
      setSelectedImages([...selectedImages, ...newImages]);
    }
  };
  const handleImageClick: MouseEventHandler<HTMLImageElement> = (focusImage: string) => {
    setIsZoomed(true);
    setClickImage(focusImage);
  };

  const handleCloseZoom: MouseEventHandler<HTMLDivElement> = () => {
    setIsZoomed(false);
    setClickImage(null);
  };

  const handleImageDelete = index => {
    const updatedImages = [...selectedImages.slice(0, index), ...selectedImages.slice(index + 1)];
    setSelectedImages(updatedImages);
  };

  return (
    <Flex flexDirection="row" flexWrap="wrap">
      <Flex flexDirection="row" width="100%" justifyContent="center" flexWrap="wrap">
        {selectedImages.map((image, index) => (
          <Flex flexDirection="column" h="100px" margin="5px">
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Selected ${index}`}
              style={{ maxWidth: '100px', height: '50px', margin: '10px', justifyContent: 'center' }}
              onClick={() => handleImageClick(image)}
            />
            <Button color="white" variant="solid" colorScheme="red" onClick={() => handleImageDelete(index)}>
              삭제
            </Button>
          </Flex>
        ))}
        {isZoomed && clickImage && (
          <Flex
            width="100%"
            height="20vh"
            justifyContent="center"
            alignContent="center"
            onClick={handleCloseZoom} //직접 호출
          >
            <img
              src={URL.createObjectURL(clickImage)}
              style={{ maxWidth: '80%', maxHeight: '80%', justifyContent: 'center' }}
            />
          </Flex>
        )}
      </Flex>
      <Flex justifyContent="center" alignContent="center" flexDirection="row" gap="10px">
        <Button color="white" variant="solid" colorScheme="brand" onClick={handleUploadButtonClick}>
          파일 업로드하기
          <input type="file" ref={inputRef} onChange={handleImageChange} hidden multiple accept="image/*" />
        </Button>
        <p>첨부할 이미지 5장 이하로 골라주세요!</p>
      </Flex>
    </Flex>
  );
};

export default ImageUploader;
