import { FC, useState, useRef, MouseEventHandler, ChangeEventHandler } from 'react';
import { Flex, Button, Image, Badge, Grid, Box, Text } from '@chakra-ui/react';
import { SimpleFile } from '@/api/@types/File';
import { FileService } from '@/api/services/File';

const MAX = 5;

const ImageUploader: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<SimpleFile[]>([]);
  const [thumbImage, setThumbImage] = useState<SimpleFile | null>(null);

  const handleUploadButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    inputRef.current?.click();
  };

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = async event => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    const prevImageLength = images.length;
    const willAppendImages = (() => {
      if (prevImageLength + files.length <= MAX) {
        return files;
      }
      alert(`최대 이미지 파일 ${MAX}개까지만 선택할 수 있습니다. 선택한 파일 중 ${MAX}개만 지정하여 업로드하겠습니다.`);
      const limited = files.slice(0, MAX - prevImageLength);
      return limited;
    })();

    if (willAppendImages.length === 0) return;

    try {
      const { files } = await FileService.uploadFile({ files: willAppendImages });
      const nextImages = [...images, ...files];
      setImages(nextImages);
      if (prevImageLength === 0) {
        setThumbImage(nextImages[0]);
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleImageClick = (focusImage: SimpleFile) => {
    setThumbImage(focusImage);
    // alert('대표사진으로 지정되었습니다');
  };

  const handleImageDelete = (targetImageId: number) => {
    const nextImages = images.filter(image => image.id !== targetImageId);
    setImages(nextImages);

    if (thumbImage?.id === targetImageId) {
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
              <Image src={thumbImage.uploadPath} />
            </>
          )}
        </Flex>

        <Grid flex="3" gridTemplateColumns="repeat(3, 1fr)" gridTemplateRows="1fr 1fr" gap={2}>
          {Array.from({ length: MAX }).map((_, index) => {
            const image: SimpleFile | undefined = images[index];
            const clicked = !!image && !!thumbImage && image.id === thumbImage.id;

            return (
              <Flex
                key={`product-${index}-${image?.id}`}
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
                      src={image.uploadPath}
                      alt="Product Image"
                      onClick={() => handleImageClick(image)}
                      w="100%"
                      h="auto"
                      aspectRatio="1/1"
                      objectFit="contain"
                    />
                    <Button size="sm" mt={1} colorScheme="red" onClick={() => handleImageDelete(image.id)}>
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
