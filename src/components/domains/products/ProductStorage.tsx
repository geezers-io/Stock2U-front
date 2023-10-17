import { FC } from 'react';
import { Flex, Image, Button, Grid, Box } from '@chakra-ui/react';
import { colors } from '@/styles/theme/@colors';

const ProductImageStorage: FC = () => {
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
        <Button color="white" bgColor={colors.brand[700]} variant="solid">
          이미지 업로드
        </Button>
      </Grid>
    </div>
  );
};

export default ProductImageStorage;
