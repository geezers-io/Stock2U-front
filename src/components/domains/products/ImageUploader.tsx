import { FC, useState, useRef, MouseEventHandler, ChangeEventHandler } from 'react';
import { Flex, Button, Heading, Highlight } from '@chakra-ui/react';

const ImageUploader: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [clickedImage, setClickedImage] = useState<File | null>(null);

  const handleUploadButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    inputRef.current?.click();
  };

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = event => {
    const files = [...(event.target.files ?? [])];
    if (!files.length) return;
    console.log(files);
    const newImages = Array.from(files).slice(0, 5);

    if (selectedImages.length + files.length <= 5) {
      setSelectedImages([...selectedImages, ...newImages]);
      console.log(selectedImages);
    } else {
      alert(`최대 이미지 파일 5개까지만 선택할 수 있습니다. 선택한 파일 중 5개만 지정하여 업로드하겠습니다.`);
      const limitImage = Array.from(files).slice(0, 5 - selectedImages.length);
      setSelectedImages([...selectedImages, ...limitImage]);
    }
  };

  const handleImageClick = (focusImage: File) => {
    setClickedImage(focusImage);
    alert('대표사진으로 지정되었습니다');
  };

  const handleImageDelete = (targetImageName: string) => {
    const updatedImages = selectedImages.filter(image => image.name !== targetImageName);
    setSelectedImages(updatedImages);

    if (clickedImage?.name === targetImageName) {
      setClickedImage(null);
    }
  };

  return (
    <Flex flexDirection="row" flexWrap="wrap">
      <Flex flexDirection="row" width="100%" justifyContent="center" flexWrap="wrap">
        {selectedImages.map(image => (
          <Flex flexDirection="column" h="100px" margin="5px">
            <img
              key={image.name}
              src={URL.createObjectURL(image)}
              alt={`Selected ${image.name}`}
              style={{ maxWidth: '100px', height: '50px', margin: '10px', justifyContent: 'center' }}
              onClick={() => handleImageClick(image)}
            />
            <Button color="white" variant="solid" colorScheme="red" onClick={() => handleImageDelete(image.name)}>
              삭제
            </Button>
          </Flex>
        ))}

        {clickedImage && (
          <Flex width="100%" height="20vh" justifyContent="center" alignContent="center" margin="10px">
            <Heading lineHeight="tall" size="md">
              <Highlight query="대표사진" styles={{ px: '2', py: '1', rounded: 'full', bg: 'brand.100' }}>
                대표사진
              </Highlight>
            </Heading>
            <img
              src={URL.createObjectURL(clickedImage)}
              style={{ maxWidth: '80%', maxHeight: '80%', justifyContent: 'center' }}
            />
          </Flex>
        )}
      </Flex>
      <Flex display="fix" justifyContent="center" alignContent="center" flexDirection="row" gap="10px">
        <Button color="white" variant="solid" colorScheme="brand" onClick={handleUploadButtonClick}>
          파일 업로드하기
          <input type="file" ref={inputRef} onChange={handleImageChange} hidden multiple accept="image/*" />
        </Button>
        <p>첨부할 이미지를 5장 이하로 골라주세요! 또, 첨부된 이미지 중 하나만 선택해 대표사진으로 지정해주세요!</p>
      </Flex>
    </Flex>
  );
};

export default ImageUploader;
