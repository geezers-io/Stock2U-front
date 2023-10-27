import { ProductType, ReservationStatus } from './@enums';
import { SimpleFile } from './File';

export interface ProductSeller {
  id: number;
  username: string;
  phone: string;
  salesCount: number;
  reviewCount: number;
}

export interface GetProductsDetailRequest {
  id: number;
}
export interface GetProductsDetailResponse {
  id: number;
  title: string;
  price: number;
  type: ProductType;
  description: string;
  onlyOneReserve: boolean;
  showAccountDetails: boolean;
  expiredAt: Date;
  status?: ReservationStatus; // 예약 상태(예약 한 건만 받기 체크 && 예약 진행 중일 시 표기 됨)
  seller: ProductSeller;
  productImages: SimpleFile[];
}

export interface ProductsClient {
  getDetail(request: GetProductsDetailRequest): Promise<GetProductsDetailResponse>;
}
