import { FC, useRef } from 'react';
import { Flex, Image, Button, Box } from '@chakra-ui/react';

const ImageSelector: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  // const [images, setImages] = useState<File>();
  // const [file, setFile] = useState<File>();

  // const handleImageChange: ChangeEventHandler<HTMLInputElement> = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();

  // const files = [...(e.target.files ?? [])];
  // try {
  //   const formData = new FormData();
  //   formData.append('file', files);

  //   console.log(formData);

  //   const response = await AuthService.file() {
  // } ,catch (error) {
  //   console.error('이미지 업로드 실패:', error)
  // };

  // const handleUploadButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
  //   inputRef.current?.click();
  // };

  return (
    <div>
      <Flex flexDirection="row">
        <Box w="50%">
          <Image fallbackSrc="https://via.placeholder.com/300" p="1rem" />
        </Box>
        <Flex flexDirection="row" display="inline-flex" flexWrap="wrap" w="50%">
          <Image fallbackSrc="https://via.placeholder.com/150" p="1rem" />
          <Image fallbackSrc="https://via.placeholder.com/150" p="1rem" />
          <Image fallbackSrc="https://via.placeholder.com/150" p="1rem" />
        </Flex>
      </Flex>

      <Button color="white" variant="solid" colorScheme="brand" /*onClick={handleUploadButtonClick}*/>
        파일 업로드하기
        <input type="file" ref={inputRef} /* onChange={handleImageChange}*/ hidden multiple accept="image/*" />
      </Button>
    </div>
  );
};

export default ImageSelector;
