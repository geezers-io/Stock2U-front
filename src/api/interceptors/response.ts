import { AxiosError, AxiosResponse } from 'axios';
import { getErrorMessage } from '@/api/helper';
import { PARAM_KEY as REDIRECT_PARAM_KEY } from '@/hooks/useRedirect';
import { printErrorLog, printResponseLog } from '@/utils/log';

export function logResponse(response: AxiosResponse) {
  const { config, data } = response;

  printResponseLog({
    method: config?.method,
    endPoint: config?.url,
    responseObj: data?.data ?? data,
  });

  return response;
}

export function unwrapResponse(response: AxiosResponse) {
  return response.data?.data ?? response.data;
}

export function logAndProcessError(e: AxiosError) {
  const url = e.config?.url;
  const method = e.config?.method;

  const errorMessage = getErrorMessage(e);

  printErrorLog({
    method,
    endPoint: url,
    errorMessage,
    errorObj: e,
  });

  // FIXME: 비로그인 상태에서 판매자 파일 업로드 시 에러 토스트가 보이는 문제 있음
  if (e.status === 401 || e.response?.status === 401) {
    if (!location.pathname.includes('auth')) {
      location.href = `/auth/sign-in?${REDIRECT_PARAM_KEY}=${location.pathname}`;
      return;
    }
  }

  return Promise.reject(e);
}
