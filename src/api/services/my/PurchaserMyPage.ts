import { PurchaserMyPageClient } from '@/api/@types/my/PurchaserMyPage';
import { axiosInstance } from '@/api/client';

export const MY_ROUTE = 'my';
const ROUTE = 'purchaser';

export const purchaserMyPageService: PurchaserMyPageClient = {
  search: async () => {
    return await axiosInstance.get(`${MY_ROUTE}/${ROUTE}`);
  },
  subscribe: async params => {
    return await axiosInstance.post(`${MY_ROUTE}/${ROUTE}/subscribe`, null, {
      params,
    });
  },
  listSearch: async request => {
    return await axiosInstance.get(`${MY_ROUTE}/${ROUTE}/subscribe/list`, {
      params: request,
    });
  },
  unsubscribe: async request => {
    return await axiosInstance.delete(`${MY_ROUTE}/${ROUTE}/unsubscribe`, {
      params: request,
    });
  },
};
