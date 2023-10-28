import { FC, MouseEventHandler } from 'react';
import { Filter, Map } from 'react-bootstrap-icons';
import { Badge, BadgeProps, Box, Flex, IconButton, IconButtonProps, useDisclosure } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { ProductType } from '@/api/@types/@enums';
import { Distance } from '@/api/@types/Products';
import { ProductsService } from '@/api/services/Products';
import ProductCards from '@/components/domains/products/ProductCards';
import SearchFilterDrawer, { FilterValues } from '@/components/domains/products/SearchFilterDrawer';
import InfiniteScroll from '@/components/shared/InfinityScroll';
import { PRODUCT_TYPE_LABEL } from '@/constants/labels';
import { MIN_PRICE } from '@/constants/product';
import { useCustomToast } from '@/hooks/useCustomToast';
import { DEFAULT_PAGE_REQUEST, usePagination } from '@/hooks/usePagination';
import { useBoundedStore } from '@/stores';
import { pick } from '@/utils/object';

const ProductsSearchPage: FC = () => {
  const theme = useTheme();
  const toast = useCustomToast();
  const geoLocation = useBoundedStore(state => state.geoLocation);
  const { data, loading, nextPage, pageable, request, setRequest } = usePagination(ProductsService.search, {
    ...DEFAULT_PAGE_REQUEST,
    size: 30,
    distance: Distance.Ten,
    minPrice: MIN_PRICE,
    latitude: geoLocation.latitude,
    longitude: geoLocation.longitude,
  });
  const { isOpen: filterDrawerOpen, onOpen: openFilterDrawer, onClose: closeFilterDrawer } = useDisclosure();

  const handleClickProductType: MouseEventHandler<HTMLButtonElement> = e => {
    const { filterId } = e.currentTarget.dataset;
    const productType = filterId === 'all' ? undefined : (filterId as ProductType);
    setRequest(prev => ({ ...prev, category: productType }));
  };

  const handleClickMap: MouseEventHandler<HTMLButtonElement> = () => {
    // TODO: map drawer
    toast.warning('미구현');
  };

  return (
    <Box minH="inherit" pt={4}>
      <Flex as="header" justifyContent="space-between" alignItems="center" flexWrap="wrap-reverse" gap={2}>
        <Flex gap={1.5}>
          {/* TODO: https://chakra-ui.com/docs/components/radio/usage#custom-radio-buttons */}
          <HeaderTextButton data-filter-id="all" onClick={handleClickProductType} active={!request.category}>
            All
          </HeaderTextButton>
          {Object.entries(PRODUCT_TYPE_LABEL).map(([enumValue, label]) => (
            <HeaderTextButton
              key={enumValue}
              data-filter-id={enumValue}
              onClick={handleClickProductType}
              active={request.category === enumValue}
            >
              {label}
            </HeaderTextButton>
          ))}
        </Flex>
        <Flex gap={1}>
          <HeaderIconButton
            aria-label="filter"
            icon={<Filter size={32} color={theme.colors.gray['600']} />}
            onClick={openFilterDrawer}
          />
          <HeaderIconButton
            aria-label="map"
            icon={<Map size={21} color={theme.colors.gray['600']} />}
            onClick={handleClickMap}
          />
        </Flex>
      </Flex>

      <pre>{JSON.stringify(request, null, 2)}</pre>

      <InfiniteScroll
        load={nextPage}
        hasMore={!pageable.isLastPage}
        dataLength={data?.length}
        isLoading={loading}
        endMessage="더 이상 불러올 재고가 없어요"
      >
        <ProductCards
          uniqueKey="search"
          products={data}
          emptyComment="조회된 재고가 없어요 :("
          linkTo={id => `/products/${id}`}
          mockCount={30}
        />
      </InfiniteScroll>

      <SearchFilterDrawer
        isOpen={filterDrawerOpen}
        close={closeFilterDrawer}
        onOk={filterValues => {
          setRequest(prev => ({ ...prev, ...filterValues }));
        }}
        initialValues={pick(request, ['distance', 'minPrice', 'maxPrice']) as FilterValues}
      />
    </Box>
  );
};

function HeaderTextButton({ active, ...rest }: BadgeProps & { active: boolean }) {
  return (
    <Badge
      as="button"
      fontSize="sm"
      py={1.5}
      px={4}
      fontWeight={500}
      borderRadius="16px"
      colorScheme={active ? 'brand' : 'gray'}
      {...rest}
    />
  );
}
function HeaderIconButton(props: IconButtonProps) {
  return <IconButton size="md" variant="ghost" {...props} />;
}

export default ProductsSearchPage;
