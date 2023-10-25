import { FC, useEffect, useState } from 'react';
import { Text, Heading, Box, Button, Avatar, Flex, Grid, Badge, Stack } from '@chakra-ui/react';
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
      <Flex flexDirection="column" padding="1.2rem 0" gap="5px">
        <Heading as="h3" size="lg" textAlign="center">
          {productDetail.title}
        </Heading>
        <Flex justifyContent="right" alignContent="center" gap="10px">
          <Badge fontSize="xl" variant="outline" colorScheme="brand" justifyContent="center">
            DEADLINE
          </Badge>
          <Text fontSize="xl">{productDetail.date} </Text>
        </Flex>
        <Flex justifyContent="center" alignItems="center" direction="column">
          <Text>사진을 눌러 크게 보세요!</Text>
          <ImageSelector />
        </Flex>
        <Box>
          <Flex gap="10px" mb="5px" mt="5px">
            <Badge fontSize="xl" colorScheme="purple">
              Ticket
            </Badge>
            <Text fontSize="xl" as="b">
              {productDetail.stockName}
            </Text>
          </Flex>
        </Box>

        <Box>
          <Text fontSize="xl">{productDetail.detail} </Text>
        </Box>
      </Flex>

      {/*seller*/}
      <Flex>
        <Avatar size="xl" src="https://bit.ly/sage-adebayo" />
        <Box ml="3" w="100%">
          <Text fontSize="xl" fontWeight="bold">
            {mockProductDetail.seller.nickname} 님
            <Badge fontSize="xl" colorScheme="green">
              판매자
            </Badge>
            <Text fontSize="xl" color="gray">
              판매 재고 {mockProductDetail.seller.stockCount} 후기 {mockProductDetail.seller.reviewCount}
            </Text>
          </Text>
        </Box>
        <Box>
          <Button colorScheme="brand" float="right">
            판매자 구독하기
          </Button>
        </Box>
      </Flex>

      {/*reservation*/}
      <Box>
        <Stack direction="row" justifyContent="right" gap="10px">
          <Badge fontSize="xl" variant="outline" colorScheme="brand" justifyContent="center">
            금액
          </Badge>
          <Text fontSize="xl" as="b">
            {productDetail.price}원
          </Text>
        </Stack>
        <Grid p="1.2rem 0">
          <Button colorScheme="brand">구매 예약 요청하기</Button>
        </Grid>
      </Box>
    </div>
  );
};

export default ProductDetailPage;
