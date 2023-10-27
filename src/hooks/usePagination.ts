import { useCallback, useMemo, useState } from 'react';
import { PageRequest, PageResponseDoro } from '@/api/@types/@shared';

const defaultPageRequest = {
  page: 0,
  size: 10,
};

export function usePagination(initialPageRequest: PageRequest = defaultPageRequest) {
  const [pageRequest, setPageRequest] = useState<PageRequest>(initialPageRequest);
  const [pageResponse, setPageResponse] = useState<PageResponseDoro>({
    countPerPage: 0,
    totalCount: 0,
    currentPage: pageRequest.page,
  });

  const totalPages = useMemo(() => {
    return Math.ceil(pageResponse.totalCount / pageResponse.countPerPage);
  }, [pageResponse]);

  const resetPageRequest = useCallback(() => {
    setPageRequest(initialPageRequest);
  }, [initialPageRequest]);

  const setPage = useCallback((page: number) => {
    setPageRequest(prev => ({
      ...prev,
      page,
    }));
  }, []);

  return {
    totalPages,
    totalCount: pageResponse.totalCount,
    pageRequest,
    setPage,
    setPageResponse,
    resetPageRequest,
  };
}
