import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createGeoSlice, GeoSlice } from '@/stores/geo';
import { createUserSlice, UserSlice } from '@/stores/user';
import { pick } from '@/utils/object';

export const useBoundedStore = create<UserSlice & GeoSlice>()(
  persist(
    (...args) => ({
      ...createUserSlice(...args),
      ...createGeoSlice(...args),
    }),
    {
      name: 'bounded-store',
      partialize: state => pick(state, ['user']),
    },
  ),
);
