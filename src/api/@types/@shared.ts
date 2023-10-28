/**
 * @description API 공용 에러 interface
 */
export interface ApiError {
  errorCode: string; // TODO: to enum
  message: string;
}

export interface PageRequest {
  page: number;
  size: number;
}

interface SortResponse {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
interface PageableResponse {
  sort: SortResponse;
  offset: number;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
  paged: boolean;
}
export interface PageResponse<T> {
  // NOTE: request 정보를 나타내는 필드들은 불필요하여 타입에서 제거 (주석처리)
  totalPages: number;
  totalElements: number;
  // size: number;
  content: T[];
  // number: number;
  // sort: SortResponse;
  pageable: PageableResponse;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
