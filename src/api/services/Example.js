import { axiosInstance } from '@/api/client';

const ROUTE = 'temp';

export const ExampleService = {
  getHello: async ({ helloString }) => {
    return await axiosInstance.get(`${ROUTE}/hello-world`, {
      params: {
        helloString,
      },
    });
  },

  postHello: async ({ helloString }) => {
    return await axiosInstance.post(`${ROUTE}/hello-world`, { helloString });
  },
};
