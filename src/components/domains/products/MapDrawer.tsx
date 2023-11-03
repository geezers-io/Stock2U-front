import { FC, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import { Coordinate } from '@/api/@types/@shared';
import { generateMockCoords } from '@/api/__mock__/coordinates';
import ClusterMarker from '@/components/domains/products/ClusterMarker';
import { useBoundedStore } from '@/stores';

interface Props {
  isOpen: boolean;
  close: () => void;
  coords?: Coordinate[];
  clusterLevel?: number;
}

const MapDrawer: FC<Props> = ({ isOpen, close, coords, clusterLevel = 4 }) => {
  const geo = useBoundedStore(state => state.geo);
  const mockCoordinates = useRef(coords ?? generateMockCoords(geo)).current;
  const [level, setLevel] = useState(3);

  return (
    <Drawer isOpen={isOpen /* FIXME */} onClose={close} placement="bottom">
      <DrawerOverlay />
      <DrawerContent h="100vh">
        <DrawerCloseButton size="lg" right="10px" color="gray.600" zIndex={1} />
        <DrawerBody transitionDuration="400ms" p={0} position="relative">
          <Map
            center={{ lat: geo.latitude, lng: geo.longitude }}
            level={level}
            onZoomChanged={map => setLevel(map.getLevel())}
            style={{ width: '100%', height: '100vh' }}
          >
            {level > clusterLevel && <ClusterMarker coordinates={mockCoordinates} />}
            {level <= clusterLevel &&
              mockCoordinates.map(coordinate => (
                <MapMarker
                  key={JSON.stringify(coordinate)}
                  position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
                />
              ))}
          </Map>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MapDrawer;
