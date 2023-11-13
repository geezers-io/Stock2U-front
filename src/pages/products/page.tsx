import { FC, MouseEventHandler, useCallback, useMemo, useState } from 'react';
import { Filter, Map } from 'react-bootstrap-icons';
import { Badge, BadgeProps, Box, Flex, IconButton, IconButtonProps, useDisclosure } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { ProductType } from '@/api/@types/@enums';
import { Distance, ProductSummary } from '@/api/@types/Products';
import { generateMockProducts } from '@/api/__mock__/mockProduct';
import { ProductsService } from '@/api/services/Products';
import ProductCards from '@/components/domains/products/ProductCards';
import SearchFilterDrawer, { FilterValues } from '@/components/domains/products/SearchFilterDrawer';
import MapDrawer from '@/components/domains/products/map/MapDrawer';
import ProductMarker from '@/components/domains/products/map/ProductMarker';
import ProductMarkerOverlay from '@/components/domains/products/map/ProductMarkerOverlay';
import InfiniteScroll from '@/components/shared/InfinityScroll';
import { PRODUCT_TYPE_LABEL } from '@/constants/labels';
import { PRODUCT_MIN_PRICE } from '@/constants/product';
import { DEFAULT_PAGE_REQUEST, usePagination } from '@/hooks/usePagination';
import { useBoundedStore } from '@/stores';
import { pick } from '@/utils/object';

const ProductsSearchPage: FC = () => {
  const theme = useTheme();
  const geo = useBoundedStore(state => state.geo);
  const { data, loading, nextPage, pageable, request, setRequest } = usePagination(ProductsService.search, {
    ...DEFAULT_PAGE_REQUEST,
    size: 30,
    distance: Distance.Five,
    minPrice: PRODUCT_MIN_PRICE,
    latitude: geo.latitude,
    longitude: geo.longitude,
  });
  const { isOpen: filterDrawerOpen, onOpen: openFilterDrawer, onClose: closeFilterDrawer } = useDisclosure();
  const { isOpen: mapDrawerOpen, onOpen: openMapDrawer, onClose: closeMapDrawer } = useDisclosure();
  const mockProducts = useMemo(() => generateMockProducts(geo, 500, 5), [geo]);
  const [clickedMarker, setClickedMarker] = useState<{
    product: ProductSummary;
    position: kakao.maps.LatLng;
  }>();

  const handleClickProductType: MouseEventHandler<HTMLButtonElement> = e => {
    const { filterId } = e.currentTarget.dataset;
    const productType = filterId === 'all' ? undefined : (filterId as ProductType);
    setRequest(prev => ({ ...prev, category: productType }));
  };

  const handleClickMapMarker = useCallback((marker: kakao.maps.Marker, product: ProductSummary) => {
    setClickedMarker({
      product,
      position: marker.getPosition(),
    });
  }, []);

  const onClickBackToUserCoords = useCallback(() => {
    setClickedMarker(undefined);
  }, []);

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
            onClick={openMapDrawer}
            isLoading={!geo.status.initialized}
          />
        </Flex>
      </Flex>

      {/* FIXME: 개발 완료되면 제거 */}
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

      {geo.status.initialized && (
        <MapDrawer
          isOpen={mapDrawerOpen}
          close={closeMapDrawer}
          data={mockProducts}
          loadMore={{
            fn: nextPage,
            currentPage: pageable.currentPage,
            totalPages: pageable.totalPages,
          }}
          renderMarker={({ data }) => <ProductMarker key={data.id} product={data} onClick={handleClickMapMarker} />}
          onClickBackToUserCoords={onClickBackToUserCoords}
          customOverlay={
            clickedMarker && (
              <ProductMarkerOverlay
                latitude={clickedMarker.position.getLat()}
                longitude={clickedMarker.position.getLng()}
                product={clickedMarker.product}
              />
            )
          }
        />
      )}
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
