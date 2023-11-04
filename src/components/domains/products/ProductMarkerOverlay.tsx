import { FC, ReactNode } from 'react';
import { EggFried, HouseDoor, TicketPerforated } from 'react-bootstrap-icons';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Link } from 'react-router-dom';
import { Box, Flex, LinkBox, Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { ProductType } from '@/api/@types/@enums';
import { Coordinate } from '@/api/@types/@shared';
import { ProductSummary } from '@/api/@types/Products';
import { processer } from '@/utils/process';

interface Props extends Coordinate {
  product: ProductSummary;
}

const ProductMarkerOverlay: FC<Props> = ({ latitude, longitude, product }) => {
  const theme = useTheme();

  const colorDict: Record<ProductType, string> = {
    [ProductType.FOOD]: theme.colors.brand['500'],
    [ProductType.ACCOMMODATION]: theme.colors.accent['500'],
    [ProductType.TICKET]: theme.colors.sub['500'],
  };
  const iconDict: Record<ProductType, ReactNode> = {
    [ProductType.FOOD]: <EggFried color="white" />,
    [ProductType.ACCOMMODATION]: <HouseDoor color="white" />,
    [ProductType.TICKET]: <TicketPerforated color="white" />,
  };

  return (
    <CustomOverlayMap
      position={{
        lat: latitude,
        lng: longitude,
      }}
      xAnchor={0.5}
      yAnchor={1.2}
    >
      <LinkBox
        as={Link}
        to={`/products/${product.id}`}
        minW="160px"
        maxW="300px"
        display="flex"
        gap={1}
        bgColor="white"
        p="5px 12px 5px 5px"
        borderRadius="999rem"
        boxShadow="0 0.2rem 0.4rem 0 rgba(0,0,0,.15)"
        border="2px solid"
        borderColor={colorDict[product.productType]}
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          borderRadius="999rem"
          w="28px"
          bgColor={colorDict[product.productType]}
        >
          {iconDict[product.productType]}
        </Flex>
        <Box flex={1} lineHeight="1.2">
          <Text fontSize="xs" fontWeight={700}>
            {product.title}
          </Text>
          <Text fontWeight={500} fontSize="xs" color="gray.500">
            {processer.price(product.price)} · 남은 수량: {processer.remain(product.productCount, 99)}개
          </Text>
        </Box>
      </LinkBox>
    </CustomOverlayMap>
  );
};

export default ProductMarkerOverlay;
