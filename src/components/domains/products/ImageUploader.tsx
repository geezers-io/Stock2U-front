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
    console.log(files);
    setSelectedImages([...selectedImages, ...files]);
  };
  const handleImageClick: MouseEventHandler<HTMLImageElement> = (focusImage: string) => {
    setIsZoomed(true);
    setClickImage(focusImage);
  };

  const handleCloseZoom: MouseEventHandler<HTMLDivElement> = () => {
    setIsZoomed(false);
    setClickImage(null);
  };
  // src={URL.createObjectURL(file)}

  return (
    <Flex flexDirection="row" flexWrap="wrap">
      <Flex flexDirection="row" width="100%" justifyContent="center" flexWrap="wrap">
        {selectedImages.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Selected ${index}`}
            style={{ maxWidth: '100px', maxHeight: 'auto', margin: '10px', justifyContent: 'center' }}
            onClick={() => handleImageClick(image)}
          />
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
      <Flex gap="10px" justifyContent="center" alignContent="center">
        <Button color="white" variant="solid" colorScheme="brand" onClick={handleUploadButtonClick}>
          파일 업로드하기
          <input type="file" ref={inputRef} onChange={handleImageChange} hidden multiple accept="image/*" />
        </Button>
      </Flex>
    </Flex>
  );
};

export default ImageUploader;
