import { create } from 'zustand';
import { persist } from 'zustand/middleware/persist';
import { createUserSlice, UserSlice } from '@/stores/user';

export const useBoundedStore = create<UserSlice>()(
  persist(
    (...args) => ({
      ...createUserSlice(...args),
    }),
    {
      name: 'bounded-store',
    },
  ),
);
