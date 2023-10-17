import { StateCreator } from 'zustand/esm/vanilla';
import { User } from '@/api/@types/Auth';

export type UserSlice = {
  user?: User;
  setUser: (user?: User) => void;
};
export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = set => ({
  user: undefined,
  setUser: user => set({ user }),
});
