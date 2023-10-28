import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { ProductsService } from '@/api/services/Products';
import ProductCards from '@/components/domains/products/ProductCards';
import InfiniteScroll from '@/components/shared/InfinityScroll';
import { DEFAULT_PAGE_REQUEST, usePagination } from '@/hooks/usePagination';
import { useBoundedStore } from '@/stores';

const ProductsSearchPage: FC = () => {
  const geoLocation = useBoundedStore(state => state.geoLocation);
  const { data, loading, nextPage, pagination } = usePagination(ProductsService.search, {
    ...DEFAULT_PAGE_REQUEST,
    latitude: geoLocation.latitude,
    longitude: geoLocation.longitude,
  });

  return (
    <Box minH="inherit">
      <InfiniteScroll
        load={nextPage}
        hasMore={!pagination.isLastPage}
        dataLength={data?.length}
        isLoading={loading}
        endMessage="더 이상 불러올 재고가 없어요"
      >
        <ProductCards
          uniqueKey="search"
          products={data}
          emptyComment="조회된 재고가 없어요 :("
          linkTo={id => `/products/${id}`}
          mockCount={20}
        />
      </InfiniteScroll>
    </Box>
  );
};

export default ProductsSearchPage;
