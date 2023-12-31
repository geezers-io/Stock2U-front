import { AuthClient } from '@/api/@types/Auth';
import { axiosInstance } from '@/api/client';

const ROUTE = 'auth';

export const AuthService: AuthClient = {
  signUpPurchaser: async request => {
    return await axiosInstance.post(`${ROUTE}/signup/purchaser`, request);
  },
  signUpSeller: async request => {
    return await axiosInstance.post(`${ROUTE}/signup/seller`, request);
  },
  signIn: async request => {
    return await axiosInstance.post(`${ROUTE}/signin`, request);
  },
  signInDev: async params => {
    return await axiosInstance.post(`${ROUTE}/signin/dev`, null, {
      params,
    });
  },
  verifyCode: async request => {
    return await axiosInstance.post(`${ROUTE}/code/verify`, request);
  },
  withdraw: async request => {
    return await axiosInstance.get(`${ROUTE}/withdraw`, {
      params: request,
    });
  },
  signInURL: async request => {
    return await axiosInstance.get(`${ROUTE}/signin-url`, {
      params: request,
    });
  },
  logout: async () => {
    return await axiosInstance.get(`${ROUTE}/logout`);
  },
  sendCode: async request => {
    return await axiosInstance.get(`${ROUTE}/code`, {
      params: request,
    });
  },
  getBankList: async () => {
    return await axiosInstance.get(`${ROUTE}/bank/list`);
  },
  findAddress: async request => {
    return await axiosInstance.get(`${ROUTE}/address`, {
      params: request,
    });
  },
};
