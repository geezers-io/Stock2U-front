import { ProductsClient } from '../@types/Products';
import { axiosInstance } from '@/api/client';

const ROUTE = 'products';

export const ProductsService: ProductsClient = {
  getMainPostList: async request => {
    return await axiosInstance.get(`${ROUTE}`, {
      params: request,
    });
  },
  createPost: async request => {
    return await axiosInstance.post(`${ROUTE}`, request);
  },
  getDetail: async ({ id }) => {
    return await axiosInstance.get(`${ROUTE}/${id}`);
  },
  modified: async ({ id, ...request }) => {
    return await axiosInstance.put(`${ROUTE}/${id}`, request);
  },
  delete: async ({ id }) => {
    return await axiosInstance.delete(`${ROUTE}/${id}`);
  },
  getFilteringOfPostList: async request => {
    return await axiosInstance.get(`${ROUTE}/search`, {
      params: request,
    });
  },
};
