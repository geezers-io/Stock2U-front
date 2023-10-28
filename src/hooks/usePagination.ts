import { useCallback, useState } from 'react';
import { PageResponse } from '@/api/@types/@shared';

const DEFAULT_PAGE_REQUEST = {
  page: 0,
  size: 10,
};

export function usePagination<T>(initialPageRequest = DEFAULT_PAGE_REQUEST) {
  const [pageRequest, setPageRequest] = useState(initialPageRequest);
  const [pageResponse, setPageResponse] = useState<PageResponse<T>>();

  const pagination = {
    totalPages: pageResponse?.totalPages ?? 0,
    totalElements: pageResponse?.totalElements ?? 0,
    isFirstPage: pageResponse?.first ?? true,
    isLastPage: pageResponse?.last ?? true,
    currentPage: pageRequest.page,
  } as const;

  const resetPageRequest = useCallback(() => {
    setPageRequest(initialPageRequest);
  }, [initialPageRequest]);

  const setPage = (page: number) => {
    setPageRequest(prev => ({ ...prev, page }));
  };

  const setPaginationResponse = (res: PageResponse<T>) => {
    setPageResponse(res);
  };

  return {
    data: pageResponse?.content ?? [],
    setPage,
    setPaginationResponse,
    resetPageRequest,
    pagination,
  };
}
