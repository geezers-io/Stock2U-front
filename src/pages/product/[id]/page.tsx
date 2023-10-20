import { FC, useEffect, useState } from 'react';
import { Text, Heading, Box, Button, Stack, Avatar, Flex, Grid } from '@chakra-ui/react';
import { MockProductDetail, mockProductDetail } from '@/api/__mock__/product';
import ImageSelector from '@/components/domains/product/ImageSelector';

const ProductDetailPage: FC = () => {
  const [productDetail, setProductDetail] = useState<MockProductDetail>();

  const fetchProductDetail = async () => {
    try {
      setProductDetail(mockProductDetail);
    } catch (e) {}
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  if (!productDetail) {
    return null;
  }
  return (
    <div>
      <Flex flexDirection="column" padding="1.2rem 0">
        <Heading as="h3" size="lg">
          {productDetail.title}
        </Heading>
        <ImageSelector />
        <Box>
          <Heading as="h4" size="md">
            잔여 재고 이름
          </Heading>
          <Text fontSize="xl">{productDetail.stockName} </Text>
        </Box>
        `
        <Box>
          <Heading as="h4" size="md">
            종류
          </Heading>
          <Text fontSize="xl">{productDetail.productType} </Text>
        </Box>
        <Box>
          <Heading as="h4" size="md">
            금액
          </Heading>
          <Text fontSize="xl">{productDetail.price} </Text>
        </Box>
        <Box>
          <Heading as="h4" size="md">
            판매 마감 기한
          </Heading>
          <Text fontSize="xl">{productDetail.date} </Text>
        </Box>
        <Box>
          <Heading as="h4" size="md">
            상세 내용
          </Heading>
          <Text fontSize="xl">{productDetail.detail} </Text>
        </Box>
      </Flex>

      {/*seller*/}
      <Flex position="relative" p="1.2rem 0">
        <Box w="auto" p=" 1.2rem 2rem" verticalAlign="bottom">
          <Stack direction="row">
            <Avatar size="lg" name={mockProductDetail.seller.nickname} src="https://bit.ly/broken-link" />
          </Stack>
        </Box>
        <Box w="60%" p=" 1.2rem 0">
          <Text fontSize="xl">{mockProductDetail.seller.nickname} 님</Text>
          <Text fontSize="xl">
            판매 재고 {mockProductDetail.seller.stockCount} 후기 {mockProductDetail.seller.reviewCount}
          </Text>
        </Box>
        <Box w="auto" p="1.2rem 2rem">
          <Button colorScheme="gray" float="right">
            판매자 구독하기
          </Button>
        </Box>
      </Flex>

      {/*reservation*/}
      <Grid p="1.2rem 0">
        <Button colorScheme="gray">구매 예약 요청하기</Button>
      </Grid>
    </div>
  );
};

export default ProductDetailPage;
