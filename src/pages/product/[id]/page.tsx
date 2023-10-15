import { FC, useEffect, useState } from 'react';
import { Text, Heading, Box, Button, Stack, Avatar } from '@chakra-ui/react';
import styled from '@emotion/styled';
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
      <DetailStyle>
        <Heading as="h3" size="lg">
          {' '}
          {productDetail.title}
        </Heading>
        <div>
          <ImageSelector />
        </div>

        <Box>
          <Heading as="h4" size="md">
            {' '}
            잔여 재고 이름
          </Heading>
          <Text fontSize="xl">{productDetail.stockName} </Text>
        </Box>
        <Box>
          <Heading as="h4" size="md">
            {' '}
            종류
          </Heading>
          <Text fontSize="xl">{productDetail.productType} </Text>
        </Box>
        <Box>
          <Heading as="h4" size="md">
            {' '}
            금액
          </Heading>
          <Text fontSize="xl">{productDetail.price} </Text>
        </Box>
        <Box>
          <Heading as="h4" size="md">
            {' '}
            판매 마감 기한
          </Heading>
          <Text fontSize="xl">{productDetail.date} </Text>
        </Box>
        <Box>
          <Heading as="h4" size="md">
            {' '}
            상세 내용
          </Heading>
          <Text fontSize="xl">{productDetail.detail} </Text>
        </Box>
      </DetailStyle>

      {/*seller*/}
      <SellerStyle>
        <SellerAvatarStyle>
          <Stack direction="row">
            <Avatar size="lg" name={mockProductDetail.seller.nickname} src="https://bit.ly/broken-link" />
          </Stack>
        </SellerAvatarStyle>
        <SellerTextStyle>
          <Text fontSize="xl">{mockProductDetail.seller.nickname} 님</Text>
          <Text fontSize="xl">
            판매 재고 {mockProductDetail.seller.stockCount} 후기 {mockProductDetail.seller.reviewCount}
          </Text>
        </SellerTextStyle>
        <SellerButtonStyle>
          <Button colorScheme="gray" float="right">
            판매자 구독하기
          </Button>
        </SellerButtonStyle>
      </SellerStyle>

      {/*reservation*/}
      <ReservationStyle>
        <Button colorScheme="gray">구매 예약 요청하기</Button>
      </ReservationStyle>
    </div>
  );
};

const DetailStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.2rem 0;
`;

/*seller*/
const SellerStyle = styled.div`
  display: flex;
  padding: 1.2rem 0;
`;
const SellerAvatarStyle = styled.div`
  width: auto;
  padding: 1.2rem 2rem;
  float: center;
  vertical-align: bottom;
`;
const SellerTextStyle = styled.div`
  width: 60%;
  padding: 1.2rem 0;
`;
const SellerButtonStyle = styled.div`
  width: auto;
  padding: 1.2rem 2rem;
`;

/*Reservation*/
const ReservationStyle = styled.div`
  display: grid;
  padding: 1.2rem 0;
`;

export default ProductDetailPage;
