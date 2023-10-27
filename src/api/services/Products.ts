import { ProductsClient } from '../@types/Products';
import { axiosInstance } from '@/api/client';

const ROUTE = 'products';

export const ProductsService: ProductsClient = {
  getMainPageList: async request => {
    return await axiosInstance.get(`${ROUTE}`, {
      params: request,
    });
  },
  create: async request => {
    return await axiosInstance.post(`${ROUTE}`, request);
  },
  getDetail: async ({ id }) => {
    return await axiosInstance.get(`${ROUTE}/${id}`);
  },
  edit: async ({ id, ...request }) => {
    return await axiosInstance.put(`${ROUTE}/${id}`, request);
  },
  remove: async ({ id }) => {
    return await axiosInstance.delete(`${ROUTE}/${id}`);
  },
  search: async request => {
    return await axiosInstance.get(`${ROUTE}/search`, {
      params: request,
    });
  },
};
