import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createGeoLocationSlice, GeoLocationSlice } from '@/stores/geoLocation';
import { createUserSlice, UserSlice } from '@/stores/user';
import { pick } from '@/utils/object';

export const useBoundedStore = create<UserSlice & GeoLocationSlice>()(
  persist(
    (...args) => ({
      ...createUserSlice(...args),
      ...createGeoLocationSlice(...args),
    }),
    {
      name: 'bounded-store',
      partialize: state => pick(state, ['user']),
    },
  ),
);
