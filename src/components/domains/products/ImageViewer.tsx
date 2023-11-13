import { FC, useState } from 'react';
import { Flex, Image, Grid, Box } from '@chakra-ui/react';
import { SimpleFile } from '@/api/@types/File';

interface Props {
  images: SimpleFile[];
}

const HORIZONTAL_POINT = 'md';

const ImageViewer: FC<Props> = ({ images }) => {
  const [thumbImage, setThumbImage] = useState<SimpleFile>(images[0]);

  const handleImageClick = (focusImage: SimpleFile) => {
    setThumbImage(focusImage);
  };

  return (
    <Box w="100%">
      <Flex
        flexDirection={{ base: 'column-reverse', [HORIZONTAL_POINT]: 'row' }}
        w="100%"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Flex
          flex={{ base: 'auto', [HORIZONTAL_POINT]: '4' }}
          w="100%"
          h={{ base: 'auto', [HORIZONTAL_POINT]: '265px' }}
          justifyContent="center"
          alignItems="center"
          bg={thumbImage ? undefined : 'gray.100'}
          borderRadius="4px"
        >
          {thumbImage && <Image h="100%" src={thumbImage.uploadPath} />}
        </Flex>

        <Grid
          flex={{ base: 'auto', [HORIZONTAL_POINT]: '3' }}
          gridTemplateColumns={{ base: 'repeat(6, 1fr)', [HORIZONTAL_POINT]: 'repeat(3, 1fr)' }}
          gridTemplateRows={{ base: '1fr', [HORIZONTAL_POINT]: '1fr 1fr' }}
          alignItems="center"
          gap={2}
        >
          {images.map(image => {
            const clicked = !!image && !!thumbImage && image.id === thumbImage.id;

            return (
              <Flex
                key={`product-${image?.id}`}
                flexDirection="column"
                justifyContent="center"
                bg={image ? undefined : 'gray.100'}
                borderRadius="4px"
                outline={clicked ? '4px solid' : undefined}
                outlineColor="brand.500"
                outlineOffset="2px"
              >
                {image && (
                  <Image
                    role="button"
                    src={image.uploadPath}
                    alt="Product Image"
                    onMouseEnter={() => handleImageClick(image)}
                    w="100%"
                    h="auto"
                    aspectRatio="1/1"
                    objectFit="contain"
                  />
                )}
              </Flex>
            );
          })}
        </Grid>
      </Flex>
    </Box>
  );
};

export default ImageViewer;
