import { ReactNode, useState } from 'react';
import { XLg } from 'react-bootstrap-icons';
import { Map } from 'react-kakao-maps-sdk';
import {
  Box,
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
import ClusterMarker from '@/components/domains/products/ClusterMarker';
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
  clusterLevel?: number;
  renderMarker: (props: MarkerProps<T>) => ReactNode;
  customOverlay?: ReactNode;
}

const MapDrawer = <T extends Coordinate>({
  isOpen,
  close,
  data,
  clusterLevel = 4,
  renderMarker,
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
                {level > clusterLevel && (
                  <ClusterMarker coordinates={data.map(item => pick(item, ['latitude', 'longitude']))} />
                )}

                {level <= clusterLevel && data.map(item => renderMarker({ data: item }))}
                {level <= clusterLevel && customOverlay}
              </Map>
            )}
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MapDrawer;
