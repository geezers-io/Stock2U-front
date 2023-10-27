import { ProductsClient } from '../@types/Products';
import { axiosInstance } from '@/api/client';

const ROUTE = 'products';

export const ProductsService: ProductsClient = {
  getDetail: async ({ id }) => {
    return await axiosInstance.get(`${ROUTE}/${id}`);
  },
};
