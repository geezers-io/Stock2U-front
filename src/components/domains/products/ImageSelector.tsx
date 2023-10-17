import { ChangeEventHandler, FC, MouseEventHandler, useRef, useState } from 'react';
import { Flex, Image, Button, Box } from '@chakra-ui/react';
import { colors } from '@/styles/theme/@colors';

const ImageSelector: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File>();

  const handleImageClick: MouseEventHandler<HTMLButtonElement> = () => {
    inputRef.current?.click();
  };

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  };

  return (
    <div>
      <Flex flexDirection="row">
        <Box w="50%">
          <Image src="gibbresh.png" fallbackSrc="https://via.placeholder.com/300" p="1rem 1.2rem " />
        </Box>
        <Flex flexDirection="row" display="inline-flex" flexWrap="wrap" w="50%">
          <Image src="gibbresh.png" fallbackSrc="https://via.placeholder.com/150" p="1rem" />
          <Image src="gibbresh.png" fallbackSrc="https://via.placeholder.com/150" p="1rem" />
          <Image src="gibbresh.png" fallbackSrc="https://via.placeholder.com/150" p="1rem" />
        </Flex>
      </Flex>
      {image ? <img src={URL.createObjectURL(image)} alt="" /> : <img src="./photo.png" alt="" />}
      <Button color="white" variant="solid" bgColor={colors.brand[700]} onClick={handleImageClick}>
        파일 업로드하기
        <input type="file" ref={inputRef} onChange={handleImageChange} hidden />
      </Button>
    </div>
  );
};

export default ImageSelector;
