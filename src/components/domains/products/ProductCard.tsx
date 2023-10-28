import { FC } from 'react';
import { Badge, Box, Heading, Image, Text } from '@chakra-ui/react';
import { ProductType } from '@/api/@types/@enums';
import { ProductSummary } from '@/api/@types/Products';
import CountdownTimer from '@/components/domains/products/CountdownTimer';
import { PRODUCT_TYPE_LABEL } from '@/constants/labels';

interface Props {
  product: ProductSummary;
}

const badgeColorschemeDict: Record<ProductType, string> = {
  [ProductType.FOOD]: 'brand.500',
  [ProductType.ACCOMMODATION]: 'accent.500',
  [ProductType.TICKET]: 'sub.500',
};

const ProductCard: FC<Props> = ({
  product: { thumbnailUrl, productType, title, price, expiredAt, latitude, longitude },
}) => {
  return (
    <Box>
      <Image src={thumbnailUrl} w="100%" h="auto" objectFit="cover" aspectRatio="4/3" />
      <Badge bgColor={badgeColorschemeDict[productType]} color="white">
        {PRODUCT_TYPE_LABEL[productType]}
      </Badge>
      <Heading as="h2" fontSize="md" mt={1} noOfLines={1} wordBreak="break-all">
        {title}
      </Heading>
      <Text fontSize="sm" fontWeight={500} textAlign="right">
        {price.toLocaleString()}원
      </Text>
      <Text fontSize="xs" textAlign="right" letterSpacing={-0.2} color="gray.700">
        내 주변 {longitude}.{latitude}
      </Text>
      <CountdownTimer expiredAt={new Date(expiredAt)} />
    </Box>
  );
};

export default ProductCard;
