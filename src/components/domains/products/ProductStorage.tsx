import { FC, useRef, useState } from 'react';
import { Flex, Image, Button, Grid, Box } from '@chakra-ui/react';
import { colors } from '@/styles/theme/@colors';

const ProductImageStorage: FC = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState('');
  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = event => {
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
      <Grid>
        <div onClick={handleImageClick}>
          <Button color="white" bgColor={colors.brand[700]} variant="solid" onClick={handleImageChange}>
            {image ? <img src={URL.createObjectURL(image)} alt="" /> : <img src="./photo.png" alt="" />}
            파일 업로드하기 {''}
            <input type="file" ref={inputRef} onChange={handleImageChange} />
          </Button>
        </div>
      </Grid>
    </div>
  );
};

export default ProductImageStorage;
