import axios from 'axios';
import { logRequest } from './interceptors/request';
import { logError, logResponse, processError, unwrapResponse } from './interceptors/response';
import { flow } from '@/utils/flow';

export const axiosInstance = axios.create({
  baseURL: 'http://galaxy4276.asuscomm.com:8081/', // TODO: 추후 https 로 변경
  timeout: 4000,
  validateStatus: status => status >= 200 && status < 400,
});

axiosInstance.interceptors.request.use(logRequest);
axiosInstance.interceptors.response.use(flow([logResponse, unwrapResponse]), flow([logError, processError]));
