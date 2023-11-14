import { MyClient } from '@/api/@types/My';
import { axiosInstance } from '@/api/client';

const ROUTE = 'my';

export const MyService: MyClient = {
  purchaserGetAccountInfo: async () => {
    return await axiosInstance.get(`${ROUTE}/purchaser`);
  },
  purchaserSubscribe: async params => {
    return await axiosInstance.post(`${ROUTE}/purchaser/subscribe`, null, {
      params,
    });
  },
  purchaserGetSubscribedProducts: async request => {
    return await axiosInstance.get(`${ROUTE}/purchaser/subscribe/list`, {
      params: request,
    });
  },
  purchaserUnsubscribe: async request => {
    return await axiosInstance.delete(`${ROUTE}/purchaser/unsubscribe`, {
      params: request,
    });
  },
  publicAvatar: async request => {
    return await axiosInstance.post(`${ROUTE}/my/avatar`, {
      params: request,
    });
  },
  publicPhone: async request => {
    return await axiosInstance.patch(`${ROUTE}/my/phone`, {
      params: request,
    });
  },
};
