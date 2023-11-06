import type { Client } from '@stomp/stompjs';
import { StateCreator } from 'zustand/esm/vanilla';

export type SocketSlice = {
  client?: Client;
  setClient: (c: Client) => void;
};

export const createSocketSlice: StateCreator<SocketSlice, [], [], SocketSlice> = set => ({
  client: undefined,
  setClient: client => set({ client }),
});
