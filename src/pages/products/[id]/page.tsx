import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Text, Heading, Box, Avatar, Flex, Badge, Stack, Button } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ProductDetail } from '@/api/@types/Products';
import { MyService } from '@/api/services/My';
import { ProductsService } from '@/api/services/Products';
import ImageViewer from '@/components/domains/products/ImageViewer';
import ReservationButton from '@/components/domains/products/ReservationButton';
import { badgeColorschemeDict } from '@/constants/labels';
import { useCustomToast } from '@/hooks/useCustomToast';

const formattedDate = product => dayjs(product).format('YYYY년 MM월 DD일 HH시 MM분까지');

const ProductDetailPage = () => {
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

  const toggleSubscribe = () => {
    setProduct(prev => {
      if (!prev) return;
      return { ...prev, isSubscribe: !prev.isSubscribe };
    });
  };

  const subscribe = async () => {
    if (!product) return;
    try {
      await MyService.purchaserSubscribe({ id: product.seller.id });
      toggleSubscribe();
    } catch {
      toast.error('구독 요청에 실패했습니다.');
    }
  };

  const unsubscribe = async () => {
    if (!product) return;
    try {
      await MyService.purchaserUnsubscribe({ id: product.seller.id });
      toggleSubscribe();
    } catch {
      toast.error('구독 취소 요청에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchProductDetail(Number(id));
  }, []);

  if (!product) {
    return;
  }

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
            {formattedDate(product.expiredAt)}
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

      {/*seller*/}
      <Box mt="auto">
        <Flex>
          <Avatar
            size="xl"
            name={product.seller.username}
            src={product.seller?.avatarUrl ?? 'https://bit.ly/broken-link'}
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
            {product.isSubscribe && <Button onClick={unsubscribe}>구독 취소</Button>}
            {!product.isSubscribe && <Button onClick={subscribe}>구독하기</Button>}
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
