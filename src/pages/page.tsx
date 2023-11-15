import { FC, useEffect, useState } from 'react';
import { Fire } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Box, Button, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { UserRole } from '@/api/@types/@enums';
import { Distance, GetMainPageProductsResponse } from '@/api/@types/Products';
import { ProductsService } from '@/api/services/Products';
import ProductCards from '@/components/domains/products/ProductCards';
import ImageSlider from '@/components/shared/ImageCarousel';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useBoundedStore } from '@/stores';
import { pick } from '@/utils/object';

const IndexPage: FC = () => {
  const theme = useTheme();
  const [products, setProducts] = useState<GetMainPageProductsResponse>();
  const [bannerImages, setBannerImages] = useState<string[]>([]);
  const toast = useCustomToast();
  const geo = useBoundedStore(state => state.geo);
  const user = useBoundedStore(state => state.user);

  const fetchDataFromAPI = async () => {
    try {
      const response = await ProductsService.getMainPageList(pick(geo, ['latitude', 'longitude']));
      setProducts(response);
    } catch (e) {
      toast.error(e);
    }
  };

  const fetchBannerImages = async () => {
    try {
      const images = [
        'https://www.monthlypeople.com/news/photo/202306/560635_559345_3540.jpg',
        'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201701/18/htm_20170118142849573637.jpg',
        'https://i.namu.wiki/i/ETpJyld-Ok-H46FcqqlgUECJdmDctvaXpnrnM2MO-Dkn_S6H3vqFI8qYNBRmnSLM975rwaT5A6s5bDn4tC3aRA.webp',
        'https://c.wallhere.com/photos/c0/1b/anime_city_clouds_skyscraper_5_Centimeters_Per_Second_Makoto_Shinkai-241157.jpg!d',
        'https://dthezntil550i.cloudfront.net/25/latest/252001022015123200005691112/1280_960/68ee10fa-84b8-44b6-bcc2-94df2f5fac05.png',
      ];
      setBannerImages(images);
    } catch (error) {
      console.error('이미지를 불러올 수 없습니다.:', error);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
    fetchBannerImages();
  }, []);

  if (!user) return;

  return (
    <Box pt="40px">
      <Box>
        <ImageSlider images={bannerImages} />
      </Box>

      <Heading size="lg" mt="60px" mb="20px" pt="20px">
        <Text
          as="span"
          style={{
            background: `linear-gradient(145deg, ${theme.colors.brand[500]}, ${theme.colors.accent[200]})`,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          AI
        </Text>
        가 추천하는 재고 매물!
      </Heading>

      <ProductCards
        uniqueKey="aiRecommended"
        products={products?.aiRecommends}
        emptyComment="아직 추천된 재고가 없어요 :("
        linkTo={id => `/products/${id}`}
        mockCount={4}
      />

      <Heading size="lg" mt="60px" mb="20px">
        마감 임박 <Fire style={{ display: 'inline', verticalAlign: 'text-top', color: theme.colors['red']['500'] }} />
      </Heading>
      <ProductCards
        uniqueKey="myNeighborhoods"
        products={products?.myNeighborhoods}
        emptyComment="아직 마감 임박된 재고가 없어요 :("
        linkTo={id => `/products/${id}`}
        showDistance={false}
        mockCount={4}
      />
      {products?.myNeighborhoods && (
        <>
          <Spacer h={8} />
          <Link to="/products">
            <Flex
              flexDirection="column"
              alignItems="center"
              py="30px"
              border="1px solid"
              borderColor="accent.500"
              borderRadius="6px"
            >
              <Heading size="md" mb="16px">
                마감 임박 재고를 좀 더 찾아볼래요
              </Heading>
              <Button colorScheme="accent" tabIndex={-1}>
                재고 더 보기
              </Button>
            </Flex>
          </Link>
        </>
      )}

      <Heading size="lg" display="flex" alignItems="center" gap={1} mt="60px" mb="20px">
        근처에 있어요
      </Heading>
      <ProductCards
        uniqueKey="myNeighborhoods"
        products={products?.myNeighborhoods}
        emptyComment="근처에 있는 재고가 없어요 :("
        linkTo={id => `/products/${id}`}
        showExpiredAt={false}
        mockCount={4}
      />
      {products?.myNeighborhoods && (
        <>
          <Spacer h={8} />
          <Link to={`/products?distance=${Distance.Three}`}>
            <Flex
              flexDirection="column"
              alignItems="center"
              py="30px"
              border="1px solid"
              borderColor="brand.500"
              borderRadius="6px"
            >
              <Heading size="md" mb="16px">
                근처 재고를 좀 더 찾아볼래요
              </Heading>
              <Button colorScheme="brand" tabIndex={-1}>
                재고 더 보기
              </Button>
            </Flex>
          </Link>
        </>
      )}

      <Spacer h={24} />
      <Flex flexDirection="column" alignItems="center" py="30px">
        <Heading size="lg">찾으시는 잔여재고가 없나요?</Heading>
        <Heading as="h2" color="gray.500" size="md" mt={4}>
          더 많은 정보를 확인하세요!
        </Heading>
        <Spacer h={6} flex="unset" />
        <Link to="/products">
          <Button colorScheme="brand" size="lg" tabIndex={-1}>
            모든 재고 둘러보기
          </Button>
        </Link>
      </Flex>

      {user.role === UserRole.SELLER && (
        <Link to="/products/register">
          <RegistrationButton> 재고 상품 업로드하러 가요 😀</RegistrationButton>
        </Link>
      )}
    </Box>
  );
};
const RegistrationButton = styled.div`
  position: sticky;
  bottom: 10%;
  right: 50%;

  border: none;
  border-radius: 16px;
  background: royalblue;
  color: white;
  padding: 12px;
  font-weight: bold;
  box-shadow: 0px 5px 15px gray;
  cursor: pointer;
  width: 220px;
`;

export default IndexPage;
