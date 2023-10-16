import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Grid, Heading, Skeleton } from '@chakra-ui/react';
import { MockProduct } from '@/api/__mock__/mockProduct';
import ProductCard from '@/components/domains/product/ProductCard';

interface Props {
  uniqueKey: string;
  products?: MockProduct[];
  emptyComment: string;
  linkTo: (id: number) => string;
  mockCount?: number;
  coordinates: { latitude: number; longitude: number };
  expiredAt: Date;
}

const ProductCards: FC<Props> = ({ uniqueKey, emptyComment, products, linkTo, mockCount = 8, coordinates }) => {
  if (products && !products.length) {
    return (
      <Flex h="200px" justifyContent="center" alignItems="center">
        <Heading size="sm" color="gray.500">
          {emptyComment}
        </Heading>
      </Flex>
    );
  }
  return (
    <Grid
      templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }}
      columnGap="12px"
      rowGap="20px"
    >
      {!products &&
        Array.from({ length: mockCount }).map((_, i) => (
          <Skeleton
            key={'product-skeleton' + uniqueKey + i}
            isLoaded={!!products}
            aspectRatio="1/1"
            bgColor="gray.50"
          />
        ))}

      {products?.map(product => (
        <Link key={uniqueKey + product.id} to={linkTo(product.id)}>
          <ProductCard
            imageSRC={product.imageSRC}
            type={product.type}
            title={product.title}
            price={product.price}
            expiredAt={product.expiredAt}
            coordinates={coordinates} // coordinates를 전달
          />
        </Link>
      ))}
    </Grid>
  );
};

export default ProductCards;
