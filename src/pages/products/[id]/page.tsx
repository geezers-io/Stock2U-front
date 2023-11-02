import { FC, useEffect, useState } from 'react';
import { Text, Heading, Box, Button, Avatar, Flex, Badge, Stack } from '@chakra-ui/react';
import { ProductType } from '@/api/@types/@enums';
import { MockProductDetail, mockProductDetail } from '@/api/__mock__/product';
import { mockSimpleFiles } from '@/api/__mock__/simpleFile';
import ImageViewer from '@/components/domains/products/ImageViewer';
import ReservationButton from '@/components/domains/products/ReservationButton';

const badgeColorschemeDict: Record<ProductType, string> = {
  [ProductType.FOOD]: 'blue',
  [ProductType.ACCOMMODATION]: 'yellow',
  [ProductType.TICKET]: 'purple',
};

const ProductDetailPage: FC = () => {
  const [productDetail, setProductDetail] = useState<MockProductDetail>();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

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
  const cancelSubscribe = () => {
    setIsSubscribed(false);
  };
  const subscribe = () => {
    setIsSubscribed(true);
  };

  return (
    <Flex minHeight="inherit" flexDirection="column" justifyContent="space-between">
      <Flex flexDirection="column" padding="1.2rem 0" gap="5px">
        <Heading as="h3" size="lg">
          {productDetail.title}
        </Heading>
        <Flex alignItems="center" gap="10px" justifyContent="right">
          <Badge fontSize="xl" variant="outline" colorScheme="brand">
            DEADLINE
          </Badge>
          <Text fontSize="xl" as="b" color="brand.500">
            {productDetail.date}{' '}
          </Text>
        </Flex>

        <ImageViewer images={mockSimpleFiles /* TODO: API 에서 내려온 값 넣어주기 */} />

        <Flex alignItems="center" gap="10px" mb="5px" mt="5px">
          <Badge fontSize="xl" colorScheme={badgeColorschemeDict[productDetail.productType]}>
            {productDetail.productType}
          </Badge>
          <Text fontSize="xl" as="b">
            {productDetail.stockName}
          </Text>
        </Flex>

        <Text fontSize="xl">{productDetail.detail}</Text>
      </Flex>

      <Box mt="auto">
        {/*seller*/}
        <Flex>
          <Avatar
            size="xl"
            name={mockProductDetail.seller.nickname}
            src={mockProductDetail.seller.profile ? mockProductDetail.seller.profile : 'https://bit.ly/broken-link'}
          />
          <Box ml="3" w="100%">
            <Badge fontSize="xl" colorScheme="green">
              판매자
            </Badge>
            <Text fontSize="xl" fontWeight="bold">
              {mockProductDetail.seller.nickname} 님
              <Text fontSize="xl" color="gray">
                판매 재고 {mockProductDetail.seller.stockCount} 후기 {mockProductDetail.seller.reviewCount}
              </Text>
            </Text>
          </Box>
          <Flex align-items="center">
            {isSubscribed && (
              <Button colorScheme={'gray'} float="right" onClick={cancelSubscribe}>
                판매자 구독 취소하기
              </Button>
            )}
            {!isSubscribed && (
              <Button colorScheme={'brand'} float="right" onClick={subscribe}>
                판매자 구독하기
              </Button>
            )}
          </Flex>
        </Flex>

        {/*reservation*/}
        <Box>
          <Stack direction="row" justifyContent="right" gap="10px">
            <Badge fontSize="xl" variant="outline" colorScheme="brand" justifyContent="center">
              금액
            </Badge>
            <Text fontSize="xl" as="b">
              {productDetail.price.toLocaleString()}원
            </Text>
          </Stack>
        </Box>
      </Box>
      <ReservationButton />
    </Flex>
  );
};

export default ProductDetailPage;
