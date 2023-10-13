import { AuthClient } from '@/api/@types/Auth';
import { axiosInstance } from '@/api/client';

const ROUTE = 'auth';

export const AuthService: AuthClient = {
  login: async request => {
    return await axiosInstance.post(`${ROUTE}/login`, request);
  },
  verifyCode: async request => {
    return await axiosInstance.post(`${ROUTE}/code/verify`, request);
  },
  loginURL: async request => {
    return await axiosInstance.get(`${ROUTE}/login-url`, {
      params: request,
    });
  },
  sendCode: async request => {
    return await axiosInstance.get(`${ROUTE}/code`, {
      params: request,
    });
  },
  findAddress: async request => {
    return await axiosInstance.get(`${ROUTE}/address`, {
      params: request,
    });
  },
};
