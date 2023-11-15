import { FC, memo } from 'react';
import { MapMarker, useMap } from 'react-kakao-maps-sdk';
import { ProductType } from '@/api/@types/@enums';
import { ProductSummary } from '@/api/@types/Products';

interface Props {
  product: ProductSummary;
  onClick: (marker: kakao.maps.Marker, product: ProductSummary) => void;
}

const ProductMarker: FC<Props> = memo(({ product, onClick }) => {
  const map = useMap();

  return (
    <MapMarker
      key={product.id}
      position={{ lat: product.latitude, lng: product.longitude }}
      onClick={marker => {
        map.panTo(marker.getPosition());
        onClick(marker, product);
      }}
      infoWindowOptions={{
        disableAutoPan: true,
      }}
      image={{
        src: imageSrcDict[product.productType],
        size: { width: 48, height: 48 },
      }}
    />
  );
});

const imageSrcDict: Record<ProductType, string> = {
  [ProductType.FOOD]: '/image/map-marker/food.png',
  [ProductType.ACCOMMODATION]: '/image/map-marker/house.png',
  [ProductType.TICKET]: '/image/map-marker/ticket.png',
};

export default ProductMarker;
