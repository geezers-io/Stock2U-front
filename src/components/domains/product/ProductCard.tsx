import { FC } from 'react';
import { Badge, Box, Heading, Image, Text } from '@chakra-ui/react';
import { ProductType } from '@/api/@types/@enums';
import { PRODUCT_TYPE_LABEL } from '@/constants/labels';

interface Props {
  imageSRC: string;
  type: ProductType;
  title: string;
  price: number;
  expiredAt: Date;
  latitude: number;
  longitude: number;
}

const badgeColorschemeDict: Record<ProductType, string> = {
  [ProductType.FOOD]: 'brand.500',
  [ProductType.ACCOMMODATION]: 'accent.500',
  [ProductType.TICKET]: 'sub.500',
};

const ProductCard: FC<Props> = ({ imageSRC, type, title, price, expiredAt, latitude, longitude }) => {
  return (
    <Box>
      <Image src={imageSRC} w="100%" h="auto" objectFit="cover" aspectRatio="4/3" />
      <Badge bgColor={badgeColorschemeDict[type]} color="white">
        {PRODUCT_TYPE_LABEL[type]}
      </Badge>
      <Heading as="h2" size="sm" fontWeight={500} mt={1} noOfLines={1} wordBreak="break-all">
        {title}
      </Heading>
      <Text size="sm" mt={1} textAlign="right" fontWeight="bold">
        {price.toLocaleString()}원
      </Text>
      <Text size="sm" textAlign="right">
        경도: {longitude} / 위도: {latitude}
      </Text>
      <Text size="sm" textAlign="right">
        만료일: {expiredAt.toISOString()}
      </Text>
    </Box>
  );
};

export default ProductCard;
