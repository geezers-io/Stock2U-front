import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { PageRequest, PageResponse } from '@/api/@types/@shared';
import { useCustomToast } from '@/hooks/useCustomToast';
import { decoder } from '@/utils/qs';

export const DEFAULT_PAGE_REQUEST: PageRequest = {
  page: 0,
  size: 10,
};

// TODO: searchParams 에 표시하지 않을 필드 지정하는 기능 추가
export function usePagination<Req extends PageRequest, Data>(
  fetchFunc: (request: Req) => Promise<PageResponse<Data>>,
  initialRequest: Req,
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [response, setResponse] = useState<PageResponse<Data>>();
  const [loading, setLoading] = useState(false);
  const toast = useCustomToast();
  const request = parseSearchParams<Req>(searchParams);

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
    }
  };

  const setRequest = (next: Req | ((prev: Req) => void)) => {
    const nextRequest = typeof next === 'function' ? next(request) : request;
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
