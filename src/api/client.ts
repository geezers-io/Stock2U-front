import axios from 'axios';
import { logRequest } from '@/api/interceptors/request';
import { logAndProcessError, logResponse, unwrapResponse } from '@/api/interceptors/response';
import { flow } from '@/utils/flow';

export const axiosInstance = axios.create({
  baseURL: 'https://localhost:3000/api', // NOTE: vite proxy
  timeout: 4000,
  validateStatus: status => status >= 200 && status < 400,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(logRequest);
axiosInstance.interceptors.response.use(flow([logResponse, unwrapResponse]), logAndProcessError);
