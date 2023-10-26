import { FC, useEffect, useState } from 'react';
import { Fire } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Box, Button, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { MockProduct, mockProducts } from '@/api/__mock__/mockProduct';
import ProductCards from '@/components/domains/products/ProductCards';
import ImageSlider from '@/components/shared/ImageCarousel';
import { delay } from '@/utils/delay';

const IndexPage: FC = () => {
  const theme = useTheme();
  const [recommendedProducts, setRecommendedProducts] = useState<MockProduct[]>();
  const [nearExpirationProducts, setNearExpirationProducts] = useState<MockProduct[]>();
  const [nearProducts, setNearProducts] = useState<MockProduct[]>();
  const [bannerImages, setBannerImages] = useState<string[]>([]);

  const fetchRecommendedProducts = async () => {
    try {
      await delay();
      setRecommendedProducts(mockProducts.slice(0, 4));
    } catch (e) {}
  };
  const fetchNearExpirationProducts = async () => {
    try {
      await delay();
      setNearExpirationProducts(mockProducts.slice(0, 8));
    } catch (e) {}
  };
  const fetchNearProducts = async () => {
    try {
      await delay();
      setNearProducts(mockProducts.slice(0, 8));
    } catch (e) {}
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
    } catch (e) {}
  };

  useEffect(() => {
    fetchRecommendedProducts();
    fetchNearExpirationProducts();
    fetchNearProducts();
    fetchBannerImages();
  }, []);

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
        uniqueKey="recommended"
        products={recommendedProducts}
        emptyComment="아직 추천된 상품이 없어요 :("
        linkTo={id => `/.../${id}` /* TODO: Routing to detail page */}
      />

      <Heading size="lg" mt="60px" mb="20px">
        마감 임박 <Fire style={{ display: 'inline', verticalAlign: 'text-top', color: theme.colors['red']['500'] }} />
      </Heading>
      <ProductCards
        uniqueKey="nearExpiration"
        products={nearExpirationProducts}
        emptyComment="아직 마감 임박된 상품이 없어요 :("
        linkTo={id => `/.../${id}` /* TODO: Routing to detail page */}
      />
      {nearExpirationProducts && (
        <>
          <Spacer h={8} />
          <Link to="..." /* TODO: Routing to list page with filter */>
            <Flex
              flexDirection="column"
              alignItems="center"
              py="30px"
              border="1px solid"
              borderColor="accent.500"
              borderRadius="6px"
            >
              <Heading size="md" mb="16px">
                마감 임박 상품을 좀 더 찾아볼래요
              </Heading>
              <Button colorScheme="accent" tabIndex={-1}>
                상품 더 보기
              </Button>
            </Flex>
          </Link>
        </>
      )}

      <Heading size="lg" display="flex" alignItems="center" gap={1} mt="60px" mb="20px">
        근처에 있어요
      </Heading>
      <ProductCards
        uniqueKey="near"
        products={nearProducts}
        emptyComment="근처에 있는 상품이 없어요 :("
        linkTo={id => `/.../${id}` /* TODO: Routing to detail */}
      />
      {nearProducts && (
        <>
          <Spacer h={8} />
          <Link to="..." /* TODO: Routing to list page with filter */>
            <Flex
              flexDirection="column"
              alignItems="center"
              py="30px"
              border="1px solid"
              borderColor="brand.500"
              borderRadius="6px"
            >
              <Heading size="md" mb="16px">
                근처 상품을 좀 더 찾아볼래요
              </Heading>
              <Button colorScheme="brand" tabIndex={-1}>
                상품 더 보기
              </Button>
            </Flex>
          </Link>
        </>
      )}

      <Spacer h={24} />
      <Flex flexDirection="column" alignItems="center" py="30px">
        <Heading size="lg">찾으시는 잔여상품이 없나요?</Heading>
        <Heading as="h2" color="gray.500" size="md" mt={4}>
          더 많은 정보를 확인하세요!
        </Heading>
        <Spacer h={6} flex="unset" />
        <Link to="..." /* TODO: Routing to list page without filter */>
          <Button colorScheme="brand" size="lg" tabIndex={-1}>
            모든 재고 둘러보기
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default IndexPage;
