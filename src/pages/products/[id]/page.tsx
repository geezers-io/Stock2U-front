import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Text, Heading, Box, Button, Avatar, Flex, Badge, Stack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ProductType } from '@/api/@types/@enums';
import { ProductDetail } from '@/api/@types/Products';
import { ProductsService } from '@/api/services/Products';
import ImageViewer from '@/components/domains/products/ImageViewer';
import ReservationButton from '@/components/domains/products/ReservationButton';
import { useCustomToast } from '@/hooks/useCustomToast';

const badgeColorschemeDict: Record<ProductType, string> = {
  [ProductType.FOOD]: 'blue',
  [ProductType.ACCOMMODATION]: 'yellow',
  [ProductType.TICKET]: 'purple',
};

const ProductDetailPage = () => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductDetail>();
  const toast = useCustomToast();
  const { id } = useParams();

  const fetchProductDetail = async (id: number) => {
    try {
      const response = await ProductsService.getDetail({ id });
      setProduct(response);
    } catch (e) {
      toast.error(e);
    }
  };

  const subscribe = () => {
    try {
      setIsSubscribed(true);
    } catch {
      toast.error('구독 요청 실패:');
    }
  };

  const unSubscribe = () => {
    try {
      setIsSubscribed(false);
    } catch {
      toast.error('구독 취소 요청 실패:');
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchProductDetail(Number(id));
  }, []);

  if (!product) {
    return;
  }

  const formattedDate = dayjs(product.expiredAt).format('YYYY년 MM월 DD일 HH시 MM분까지');

  return (
    <Flex minHeight="inherit" flexDirection="column" justifyContent="space-between">
      <Flex flexDirection="column" padding="1.2rem 0" gap="5px">
        <Heading as="h3" size="lg">
          {product.title}
        </Heading>
        <Flex alignItems="center" gap="10px" justifyContent="right">
          <Badge fontSize="xl" variant="outline" colorScheme="brand">
            DEADLINE
          </Badge>
          <Text fontSize="xl" as="b">
            {formattedDate}
          </Text>
        </Flex>

        <ImageViewer images={product?.productImages} />

        <Flex alignItems="center" gap="10px" mb="5px" mt="5px">
          <Badge fontSize="xl" colorScheme={badgeColorschemeDict[product.type]}>
            {product.type}
          </Badge>
          <Text fontSize="xl" as="b">
            {product.name}
          </Text>
        </Flex>

        <Text fontSize="xl">{product.description}</Text>
      </Flex>

      <Box mt="auto">
        {/*seller*/}
        <Flex>
          <Avatar
            size="xl"
            name={product.seller.username}
            src={product.seller.profileImageUrl ? product.seller.profileImageUrl : 'https://bit.ly/broken-link'}
          />
          <Box ml="3" w="100%">
            <Badge fontSize="xl" colorScheme="green">
              판매자
            </Badge>
            <Text fontSize="xl" fontWeight="bold">
              {product.seller.username} 님
              <Text fontSize="xl" color="gray">
                판매 재고 {product.seller.salesCount} 후기 {product.seller.reviewCount}
              </Text>
            </Text>
          </Box>
          <Flex align-items="center">
            {isSubscribed && (
              <Button colorScheme={'gray'} float="right" onClick={unSubscribe}>
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
              {product.price.toLocaleString()}원
            </Text>
          </Stack>
        </Box>
      </Box>
      <ReservationButton />
    </Flex>
  );
};

export default ProductDetailPage;
