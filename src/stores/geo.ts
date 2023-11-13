import { StateCreator } from 'zustand/esm/vanilla';
import { Coordinate } from '@/api/@types/@shared';

interface GeoStatus {
  supported: boolean;
  allowed: boolean;
  initialized: boolean;
}
interface Geo extends Coordinate {
  status: GeoStatus;
}
export type GeoSlice = {
  geo: Geo;
  startGeoTracking: () => void;
};

const SEOUL_GEO: Geo = {
  latitude: 37.5665,
  longitude: 126.978,
  status: {
    supported: true,
    allowed: true,
    initialized: false,
  },
};

export const createGeoSlice: StateCreator<GeoSlice, [], [], GeoSlice> = set => ({
  geo: SEOUL_GEO,

  startGeoTracking: () => {
    if (!navigator?.geolocation) {
      set(state => ({
        geo: {
          ...state.geo,
          status: { supported: false, allowed: false, initialized: true },
        },
      }));
      return;
    }

    navigator.geolocation.watchPosition(
      position => {
        set({
          geo: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            status: { supported: true, allowed: true, initialized: true },
          },
        });
      },
      error => {
        if (error.code === error.PERMISSION_DENIED || error.code === error.TIMEOUT) {
          set(state => ({
            geo: {
              ...state.geo,
              status: { supported: true, allowed: false, initialized: false },
            },
          }));
        }
      },
    );
  },
});
