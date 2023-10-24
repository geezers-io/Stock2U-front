import { FC, useState, useRef, MouseEventHandler, ChangeEventHandler } from 'react';
import { Flex, Button, Image, Badge, Grid, Box, Text } from '@chakra-ui/react';

const MAX = 5;

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
    const newImages = Array.from(files).slice(0, MAX);

    if (selectedImages.length + files.length <= MAX) {
      setSelectedImages([...selectedImages, ...newImages]);
      console.log(selectedImages);
    } else {
      alert(`최대 이미지 파일 ${MAX}개까지만 선택할 수 있습니다. 선택한 파일 중 ${MAX}개만 지정하여 업로드하겠습니다.`);
      const limitImage = Array.from(files).slice(0, MAX - selectedImages.length);
      setSelectedImages([...selectedImages, ...limitImage]);
    }
  };

  const handleImageClick = (focusImage: File) => {
    setClickedImage(focusImage);
    // alert('대표사진으로 지정되었습니다');
  };

  const handleImageDelete = (targetImageName: string) => {
    const updatedImages = selectedImages.filter(image => image.name !== targetImageName);
    setSelectedImages(updatedImages);

    if (clickedImage?.name === targetImageName) {
      setClickedImage(null);
    }
  };

  return (
    <Box w="100%">
      <Flex w="100%" justifyContent="center" flexWrap="wrap" gap={2}>
        <Flex
          flex="4"
          h="265px"
          position="relative"
          justifyContent="center"
          alignItems="center"
          bg={clickedImage ? undefined : 'gray.100'}
          borderRadius="4px"
        >
          {clickedImage && (
            <>
              <Badge fontSize="md" colorScheme="brand" position="absolute" left="1em" top="1em">
                대표사진
              </Badge>
              <Image src={URL.createObjectURL(clickedImage)} />
            </>
          )}
        </Flex>

        <Grid flex="3" gridTemplateColumns="repeat(3, 1fr)" gridTemplateRows="1fr 1fr" gap={2}>
          {Array.from({ length: MAX }).map((_, index) => {
            const image: File | undefined = selectedImages[index];

            return (
              <Flex
                flexDirection="column"
                justifyContent="center"
                bg={image ? undefined : 'gray.100'}
                borderRadius="4px"
              >
                {image && (
                  <>
                    <Image
                      key={image.name}
                      src={URL.createObjectURL(image)}
                      alt={`Selected ${image.name}`}
                      onClick={() => handleImageClick(image)}
                      w="100%"
                      h="auto"
                      objectFit="contain"
                    />
                    <Button size="sm" mt={1} colorScheme="red" onClick={() => handleImageDelete(image.name)}>
                      삭제
                    </Button>
                  </>
                )}
              </Flex>
            );
          })}
        </Grid>
      </Flex>

      <Flex flexDirection="column" justifyContent="center" alignContent="center" gap="10px" mt={10}>
        <Button color="white" variant="solid" colorScheme="brand" onClick={handleUploadButtonClick}>
          파일 업로드하기
          <input type="file" ref={inputRef} onChange={handleImageChange} hidden multiple accept="image/*" />
        </Button>
        <Text>
          첨부할 이미지를 {MAX}장 이하로 골라주세요!
          <br />
          또, 첨부된 이미지 중 하나만 선택해 대표사진으로 지정해주세요!
        </Text>
      </Flex>
    </Box>
  );
};

export default ImageUploader;
