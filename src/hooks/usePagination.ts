import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { PageRequest, PageResponse } from '@/api/@types/@shared';
import { useCustomToast } from '@/hooks/useCustomToast';
import { isPureObject } from '@/utils/assert';
import { decoder } from '@/utils/qs';

export const DEFAULT_PAGE_REQUEST: PageRequest = {
  page: 0,
  size: 10,
};

// TODO: searchParams 에 표시하지 않을 필드 지정하는 기능 추가 - ex) 위도 경도
export function usePagination<Req extends PageRequest, Data>(
  fetchFunc: (request: Req) => Promise<PageResponse<Data>>,
  initialRequest: Req,
) {
  const toast = useCustomToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const request = { ...initialRequest, ...parseSearchParams<Req>(searchParams) };
  const prevRequestRef = useRef<Req>(request);
  const [initialFetched, setInitialFetched] = useState(false);
  const [response, setResponse] = useState<PageResponse<Data>>();
  const [loading, setLoading] = useState(false);

  const pageable = {
    totalPages: response?.totalPages ?? 0,
    totalElements: response?.totalElements ?? 0,
    isFirstPage: response?.first ?? true,
    isLastPage: response?.last ?? true,
    currentPage: request.page,
    empty: response ? response.empty : false,
  } as const;

  const fetchData = async (req: Req) => {
    if (loading) return;
    if (initialFetched && JSON.stringify(prevRequestRef.current) === JSON.stringify(req)) return;

    try {
      setLoading(true);
      const res = await fetchFunc(req);
      setResponse(prev => ({
        ...res,
        content: [...(prev?.content ?? []), ...res.content],
      }));
    } catch (e) {
      toast.error(e);
    } finally {
      setLoading(false);
      setInitialFetched(true);
      prevRequestRef.current = req;
    }
  };

  const setRequest = (next: Req | ((prev: Req) => Req)) => {
    const _request = typeof next === 'function' ? next(request) : request;
    const nextRequest = hasDifference(_request, prevRequestRef.current, new Set(['page']))
      ? { ..._request, page: 0 }
      : _request;
    setSearchParams(qs.stringify(nextRequest));
  };

  const resetRequest = () => {
    setSearchParams(qs.stringify(initialRequest));
  };

  const prevPage = () => {
    if (loading || pageable.isFirstPage) return;
    const nextRequest = { ...request, page: request.page - 1 };
    setSearchParams(qs.stringify(nextRequest));
  };

  const nextPage = () => {
    if (loading || pageable.isLastPage) return;
    const nextRequest = { ...request, page: request.page + 1 };
    setSearchParams(qs.stringify(nextRequest));
  };

  useEffect(() => {
    // TODO: products/ 진입 > 여러번 API 호출 후 뒤로가기 잘 되는지 확인 필요
    fetchData({ ...initialRequest, ...parseSearchParams<Req>(searchParams) });
  }, [searchParams]);

  return {
    data: response?.content,
    loading,
    prevPage,
    nextPage,
    request,
    setRequest,
    resetRequest,
    pageable,
  };
}

function parseSearchParams<T>(searchParams: URLSearchParams) {
  return qs.parse(searchParams.toString(), { decoder }) as T;
}

function hasDifference<T>(obj1: T, obj2: T, exceptionKeys?: Set<string>) {
  if (!isPureObject(obj1) || !isPureObject(obj2)) throw new Error('obj1, obj2 must be pure object');

  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (const key of keys) {
    if (exceptionKeys?.has(key)) continue;
    if (obj1[key] !== obj2[key]) return true;
  }
  return false;
}
