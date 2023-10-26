/**
 * @description API 공용 에러 interface
 */
export interface ApiError {
  errorCode: string; // TODO: to enum
  message: string;
}

/**
 * @description 페이지네이션 요청
 */
export interface PageRequest {
  /**
   * @min 0
   */
  page?: number;
  /**
   * @default 10
   * @max 100
   */
  size?: number;
}

/**
 * @description 페이지네이션 응답
 */
export interface PageResponse {
  countPerPage: number;
  totalCount: number;
  currentPage: number;
}
