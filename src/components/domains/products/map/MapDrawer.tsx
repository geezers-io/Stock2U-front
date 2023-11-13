import { ReactNode, useState } from 'react';
import { XLg } from 'react-bootstrap-icons';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { Coordinate } from '@/api/@types/@shared';
import BackToUserCoordsButton from '@/components/domains/products/map/BackToUserCoordsButton';
import ClusterMarker from '@/components/domains/products/map/ClusterMarker';
import MapPoint from '@/components/domains/products/map/MapPoint';
import PageHeader from '@/components/layouts/parts/PageHeader';
import { useBoundedStore } from '@/stores';
import { pick } from '@/utils/object';

interface MarkerProps<T> {
  data: T;
}
interface Props<T> {
  isOpen: boolean;
  close: () => void;
  data: T[];
  loadMore?: {
    fn: () => void;
    currentPage: number;
    totalPages: number;
  };
  clusterLevel?: number;
  renderMarker: (props: MarkerProps<T>) => ReactNode;
  onClickBackToUserCoords: () => void;
  customOverlay?: ReactNode;
}

const MapDrawer = <T extends Coordinate>({
  isOpen,
  close,
  data,
  loadMore,
  clusterLevel = 4,
  renderMarker,
  onClickBackToUserCoords,
  customOverlay,
}: Props<T>) => {
  const theme = useTheme();
  const geo = useBoundedStore(state => state.geo);
  const [level, setLevel] = useState(3);

  return (
    <Drawer isOpen={isOpen} onClose={close} placement="bottom">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader p="unset" h="unset" minH="unset">
          <PageHeader>
            <Flex w="100%" position="relative" justifyContent="center" alignItems="center">
              <IconButton
                aria-label="Back"
                position="absolute"
                left={-2}
                variant="ghost"
                icon={<XLg fontSize={24} />}
                onClick={close}
              />
              <Heading fontSize="xl" fontWeight={500}>
                지도
              </Heading>
            </Flex>
          </PageHeader>
        </DrawerHeader>
        <DrawerBody transitionDuration="400ms" p="unset" bgColor="gray.50">
          <Box
            m="0 auto"
            h={{
              base: `calc(100vh - ${theme.appStyles.headerHeight.base})`,
              md: `calc(100vh - ${theme.appStyles.headerHeight.md})`,
            }}
            maxW={theme.appStyles.maxWidth}
            position="relative"
          >
            {!data.length && <Text color="gray.700">지도에 표시할 결과가 없어요.</Text>}
            {!!data.length && (
              <Map
                center={{ lat: geo.latitude, lng: geo.longitude }}
                level={level}
                onZoomChanged={map => setLevel(map.getLevel())}
                style={{ width: '100%', height: 'inherit' }}
              >
                {/* 내 위치 */}
                <CustomOverlayMap position={{ lat: geo.latitude, lng: geo.longitude }}>
                  <MapPoint />
                </CustomOverlayMap>

                {/* 재고 마커 */}
                {level > clusterLevel && (
                  <ClusterMarker coordinates={data.map(item => pick(item, ['latitude', 'longitude']))} />
                )}
                {level <= clusterLevel && data.map(item => renderMarker({ data: item }))}
                {level <= clusterLevel && customOverlay}

                {/* 재고 더 보기 버튼 */}
                {loadMore && loadMore.currentPage + 1 < loadMore.totalPages && (
                  <Button
                    onClick={loadMore.fn}
                    colorScheme="brand"
                    variant="outline"
                    bgColor="white"
                    position="absolute"
                    zIndex={1}
                    top="1em"
                    left="50%"
                    transform="translateX(-50%)"
                    _active={{
                      transform: 'translateX(-50%) scale(0.98)',
                    }}
                    size="sm"
                    py="1.2em"
                    boxShadow="0 0.2rem 0.8rem 0 rgba(0,0,0,.2)"
                    fontWeight={400}
                    gap={1}
                  >
                    재고 더 보기
                    <Text>
                      <Text as="span" fontWeight={700} mr="0.2em">
                        {loadMore.currentPage + 1}
                      </Text>
                      / {loadMore.totalPages}
                    </Text>
                  </Button>
                )}

                {/* 내 위치로 돌아가기 버튼 */}
                <BackToUserCoordsButton
                  onClick={onClickBackToUserCoords}
                  position="absolute"
                  top="0.66em"
                  right="0.66em"
                  zIndex={1}
                />
              </Map>
            )}
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MapDrawer;
