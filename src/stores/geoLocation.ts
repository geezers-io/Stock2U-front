import { StateCreator } from 'zustand/esm/vanilla';

interface GeoLocationStatus {
  supported: boolean;
  allowed: boolean;
}
interface GeoLocation {
  latitude: number;
  longitude: number;
  status: GeoLocationStatus;
}
export type GeoLocationSlice = {
  geoLocation: GeoLocation;
  startGeoLocationTracking: () => void;
};

const SEOUL_GEO: GeoLocation = {
  latitude: 37.5665,
  longitude: 126.978,
  status: {
    supported: true,
    allowed: true,
  },
};

export const createGeoLocationSlice: StateCreator<GeoLocationSlice, [], [], GeoLocationSlice> = set => ({
  geoLocation: SEOUL_GEO,

  startGeoLocationTracking: () => {
    if (!navigator?.geolocation) {
      set(state => ({
        geoLocation: {
          ...state.geoLocation,
          status: { supported: false, allowed: false },
        },
      }));
      return;
    }

    navigator.geolocation.watchPosition(
      position => {
        set({
          geoLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            status: { supported: true, allowed: true },
          },
        });
      },
      error => {
        if (error.code === error.PERMISSION_DENIED || error.code === error.TIMEOUT) {
          set(state => ({
            geoLocation: {
              ...state.geoLocation,
              status: { supported: true, allowed: false },
            },
          }));
        }
      },
    );
  },
});
