import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createGeoSlice, GeoSlice } from '@/stores/geo';
import { createSocketSlice, SocketSlice } from '@/stores/socket';
import { createUserSlice, UserSlice } from '@/stores/user';
import { pick } from '@/utils/object';

type Slices = UserSlice & GeoSlice & SocketSlice;

export const useBoundedStore = create<Slices>()(
  persist(
    (...args) => ({
      ...createUserSlice(...args),
      ...createGeoSlice(...args),
      ...createSocketSlice(...args),
    }),
    {
      name: 'bounded-store',
      partialize: state => pick(state, ['user']),
    },
  ),
);
