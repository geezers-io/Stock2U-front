import { useCallback, useMemo, useState } from 'react';
import { PageRequest, PageResponse } from '@/api/@types/@shared';

const defaultPageRequest = {
  page: 0,
  size: 10,
};

export function usePagination(initialPageRequest: Required<PageRequest> = defaultPageRequest) {
  const [pageRequest, setPageRequest] = useState<Required<PageRequest>>(initialPageRequest);
  const [pageResponse, setPageResponse] = useState<PageResponse>({
    countPerPage: 0,
    totalCount: 0,
    currentPage: pageRequest.page,
  });

  const totalPage = useMemo(() => {
    return Math.ceil(pageResponse.totalCount / pageResponse.countPerPage);
  }, [pageResponse]);

  const nextPage = useCallback(() => {
    setPageRequest(prev => {
      if (prev.page === totalPage) return prev;
      return {
        ...prev,
        page: prev.page + 1,
      };
    });
  }, [totalPage]);

  const prevPage = useCallback(() => {
    setPageRequest(prev => {
      if (prev.page === 1) return prev;
      return {
        ...prev,
        page: prev.page - 1,
      };
    });
  }, []);

  const resetPageRequest = useCallback(() => {
    setPageRequest(initialPageRequest);
  }, [initialPageRequest]);

  return {
    totalPage,
    pageRequest,
    setPageResponse,
    resetPageRequest,
    nextPage,
    prevPage,
  };
}
