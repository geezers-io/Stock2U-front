import { ReactNode, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { Drawer, DrawerBody, DrawerContent, DrawerOverlay, Text } from '@chakra-ui/react';
import { Coordinate } from '@/api/@types/@shared';
import ClusterMarker from '@/components/domains/products/ClusterMarker';
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
  const geo = useBoundedStore(state => state.geo);
  const [level, setLevel] = useState(3);

  return (
    <Drawer isOpen={isOpen} onClose={close} placement="bottom">
      <DrawerOverlay />
      <DrawerContent h="100vh">
        <DrawerBody transitionDuration="400ms" p={0} position="relative">
          {!data.length && <Text color="gray.700">지도에 표시할 결과가 없어요.</Text>}
          {!!data.length && (
            <Map
              center={{ lat: geo.latitude, lng: geo.longitude }}
              level={level}
              onZoomChanged={map => setLevel(map.getLevel())}
              style={{ width: '100%', height: '100vh' }}
            >
              {level > clusterLevel && (
                <ClusterMarker coordinates={data.map(item => pick(item, ['latitude', 'longitude']))} />
              )}

              {level <= clusterLevel && data.map(item => renderMarker({ data: item }))}
              {level <= clusterLevel && customOverlay}
            </Map>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MapDrawer;
