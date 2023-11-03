import React, { useEffect } from 'react';
import { useMap } from 'react-kakao-maps-sdk';
import { Coordinate } from '@/api/@types/@shared';

interface ClusterMarkerProps {
  coordinates: Coordinate[];
  minLevel?: number;
}

const ClusterMarker: React.FC<ClusterMarkerProps> = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const clusterer = new kakao.maps.MarkerClusterer({
      map,
      averageCenter: true,
      texts: size => size.toLocaleString(),
      clickable: false,
    });

    const markers = coordinates.map(
      ({ latitude, longitude }) => new kakao.maps.Marker({ map, position: new kakao.maps.LatLng(latitude, longitude) }),
    );

    clusterer.addMarkers(markers);

    return () => {
      clusterer.clear();
    };
  }, [map, coordinates]);

  return null;
};

export default ClusterMarker;
