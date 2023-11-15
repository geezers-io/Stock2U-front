import { ChatClient } from '@/api/@types/Chat';
import { axiosInstance, mswInstance } from '@/api/client';

const ROUTE = '/reservation/chats';

const network = {
  client: axiosInstance,
  onDebug() {
    this.client = mswInstance;
  },
};

export const ChatService: ChatClient = {
  onDebug: () => network.onDebug(),
  getChatRooms: async params => {
    return await network.client.get(ROUTE, {
      params,
    });
  },
  getChatHistories: async params => {
    return await network.client.get(`${ROUTE}/history`, { params });
  },
};
