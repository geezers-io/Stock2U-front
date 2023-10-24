import { FC, useState, useRef, MouseEventHandler, ChangeEventHandler } from 'react';
import { Flex, Button, Image, Badge, Grid, Box, Text } from '@chakra-ui/react';

const MAX = 5;

const ImageUploader: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [thumbImage, setThumbImage] = useState<File | null>(null);

  const handleUploadButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    inputRef.current?.click();
  };

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = event => {
    const newImages = [...(event.target.files ?? [])];
    if (!newImages.length) return;

    const prevImageLength = images.length;

    const nextImages = (() => {
      if (prevImageLength + newImages.length <= MAX) {
        return [...images, ...newImages];
      }
      alert(`최대 이미지 파일 ${MAX}개까지만 선택할 수 있습니다. 선택한 파일 중 ${MAX}개만 지정하여 업로드하겠습니다.`);
      const limitImage = Array.from(newImages).slice(0, MAX - prevImageLength);
      return [...images, ...limitImage];
    })();

    setImages(nextImages);
    if (prevImageLength === 0) {
      setThumbImage(nextImages[0]);
    }
  };

  const handleImageClick = (focusImage: File) => {
    setThumbImage(focusImage);
    // alert('대표사진으로 지정되었습니다');
  };

  const handleImageDelete = (targetImageName: string) => {
    const nextImages = images.filter(image => image.name !== targetImageName);
    setImages(nextImages);

    if (thumbImage?.name === targetImageName) {
      if (nextImages.length === 0) {
        setThumbImage(null);
      } else {
        setThumbImage(nextImages[0]);
      }
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
          bg={thumbImage ? undefined : 'gray.100'}
          borderRadius="4px"
        >
          {thumbImage && (
            <>
              <Badge fontSize="md" colorScheme="brand" position="absolute" left="1em" top="1em">
                대표사진
              </Badge>
              <Image src={URL.createObjectURL(thumbImage)} />
            </>
          )}
        </Flex>

        <Grid flex="3" gridTemplateColumns="repeat(3, 1fr)" gridTemplateRows="1fr 1fr" gap={2}>
          {Array.from({ length: MAX }).map((_, index) => {
            const image: File | undefined = images[index];
            const clicked = !!image && !!thumbImage && image.name === thumbImage.name;

            return (
              <Flex
                flexDirection="column"
                justifyContent="center"
                bg={image ? undefined : 'gray.100'}
                borderRadius="4px"
                outline={clicked ? '4px solid' : undefined}
                outlineColor="brand.500"
                outlineOffset="2px"
              >
                {image && (
                  <>
                    <Image
                      role="button"
                      key={image.name}
                      src={URL.createObjectURL(image)}
                      alt={`Selected ${image.name}`}
                      onClick={() => handleImageClick(image)}
                      w="100%"
                      h="auto"
                      aspectRatio="1/1"
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
