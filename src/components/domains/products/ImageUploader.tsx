import { FC, useState, useRef, MouseEventHandler, ChangeEventHandler } from 'react';
import { Flex, Button } from '@chakra-ui/react';

const ImageUploader: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  //const [image, setImage] = useState<File>();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleUploadButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    inputRef.current?.click();
  };

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (!event.target.files) return;

    const files = event.target.files;
    console.log(files);
    setSelectedImages([...selectedImages, ...files]);
  };
  // src={URL.createObjectURL(file)}

  return (
    <Flex flexDirection="row" flexWrap="wrap">
      <Flex flexDirection="row" width="100%" justifyContent="center" flexWrap="wrap">
        {selectedImages.map((files, index) => (
          <img
            key={index}
            src={URL.createObjectURL(files)}
            alt={`Selected ${index}`}
            style={{ maxWidth: '100px', maxHeight: 'auto', margin: '10px', justifyContent: 'center' }}
          />
        ))}
      </Flex>
      <Flex gap="10px" justifyContent="center" alignContent="center">
        <Button color="white" variant="solid" colorScheme="brand" onClick={handleUploadButtonClick}>
          파일 업로드하기
          <input type="file" ref={inputRef} onChange={handleImageChange} hidden multiple accept="image/*" />
        </Button>
        <Button color="white" variant="solid" colorScheme="red" onClick={handleUploadButtonClick}>
          파일 삭제하기
          <input type="file" ref={inputRef} onChange={handleImageChange} hidden multiple accept="image/*" />
        </Button>
      </Flex>
    </Flex>
  );
};

export default ImageUploader;
