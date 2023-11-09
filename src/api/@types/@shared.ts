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
  totalPages: number;
  totalElements: number;
  size: number;
  content: T[];
  number: number;
  sort: SortResponse;
  pageable: PageableResponse;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface ProductSeller {
  id: number;
  username: string;
  phone: string;
  profileImageUrl: string;
  salesCount: number;
  reviewCount: number;
}
