import { FC } from 'react';
import { GeoAlt } from 'react-bootstrap-icons';
import { useMap } from 'react-kakao-maps-sdk';
import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { useBoundedStore } from '@/stores';

interface Props extends Omit<IconButtonProps, 'aria-label' | 'onClick'> {
  onClick: () => void;
}

const BackToUserCoordsButton: FC<Props> = ({ onClick, ...rest }) => {
  const geo = useBoundedStore(state => state.geo);
  const map = useMap();

  const handleClick = () => {
    onClick();
    map.panTo(new kakao.maps.LatLng(geo.latitude, geo.longitude));
  };

  return (
    <IconButton
      aria-label="Back to user coords"
      onClick={handleClick}
      bgColor="white"
      borderRadius="50%"
      boxShadow="0 0.2rem 0.8rem 0 rgba(0,0,0,.2)"
      size="lg"
      {...rest}
    >
      <GeoAlt size={24} color="black" />
    </IconButton>
  );
};

export default BackToUserCoordsButton;
