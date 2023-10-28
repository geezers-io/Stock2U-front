import { useEffect, useState } from 'react';
import { PageRequest, PageResponse } from '@/api/@types/@shared';
import { useCustomToast } from '@/hooks/useCustomToast';

export const DEFAULT_PAGE_REQUEST: PageRequest = {
  page: 0,
  size: 10,
};

export function usePagination<Req extends PageRequest, Data>(
  fetchFunc: (request: Req) => Promise<PageResponse<Data>>,
  initialRequest: Req,
) {
  const [pageRequest, setPageRequest] = useState(initialRequest);
  const [pageResponse, setPageResponse] = useState<PageResponse<Data>>();
  const [loading, setLoading] = useState(false);
  const toast = useCustomToast();

  const pagination = {
    totalPages: pageResponse?.totalPages ?? 0,
    totalElements: pageResponse?.totalElements ?? 0,
    isFirstPage: pageResponse?.first ?? true,
    isLastPage: pageResponse?.last ?? true,
    currentPage: pageRequest.page,
    empty: pageResponse ? pageResponse.empty : false,
  } as const;

  const fetchData = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const res = await fetchFunc(pageRequest);
      setPageResponse(res);
    } catch (e) {
      toast.error(e);
    } finally {
      setLoading(false);
    }
  };

  const resetPageRequest = () => {
    setPageRequest(initialRequest);
  };

  const prevPage = () => {
    if (loading || !pagination.isFirstPage) return;
    setPageRequest(prev => ({ ...prev, page: prev.page - 1 }));
  };

  const nextPage = () => {
    if (loading || !pagination.isLastPage) return;
    setPageRequest(prev => ({ ...prev, page: prev.page + 1 }));
  };

  useEffect(() => {
    fetchData();
  }, [pageRequest]);

  return {
    data: pageResponse?.content,
    loading,
    prevPage,
    nextPage,
    resetPageRequest,
    pagination,
  };
}
