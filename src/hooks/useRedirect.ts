import { useNavigate } from 'react-router-dom';
import { useSearchParamsObject } from '@/hooks/useSearchParamsObject';

const PARAM_KEY = 'redirect';

export function useRedirect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParamsObject();
  const to = searchParams[PARAM_KEY] || '/';

  const redirect = () => {
    navigate(to, { replace: true });
  };

  const navigateWithRedirectPath = (path: string, redirectPath: string = to, params?: Record<string, unknown>) => {
    navigate(
      withParams(path, {
        ...params,
        [PARAM_KEY]: redirectPath,
      }),
    );
  };

  return {
    redirect,
    navigateWithRedirectPath,
  };
}

function withParams(path: string, params: Record<string, unknown>): string {
  // URL 과 해시(#) 부분을 분리
  const [baseUrl, hash] = path.split('#');
  // URL 을 기본 경로와 쿼리 파라미터로 분리
  const [base, search] = baseUrl.split('?');

  const searchParams = new URLSearchParams(search);
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') {
      searchParams.set(key, value);
    }
  }
  const newSearch = searchParams.toString();

  // 새로운 경로 생성
  let newPath = base;
  if (newSearch) {
    newPath += '?' + newSearch;
  }
  if (hash) {
    newPath += '#' + hash;
  }
  return newPath;
}
