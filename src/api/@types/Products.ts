import { ProductType, ReservationStatus } from './@enums';
import { SimpleFile } from './File';
import { PageRequest, PageResponse } from '@/api/@types/@shared';

export interface ProductSeller {
  id: number;
  username: string;
  phone: string;
  salesCount: number;
  reviewCount: number;
}

export interface ProductDetail {
  id: number;
  title: string;
  price: number;
  type: ProductType;
  description: string;
  productCount: number;
  expiredAt: string;
  status?: ReservationStatus; // 예약 상태(예약 한 건만 받기 체크 && 예약 진행 중일 시 표기 됨)
  seller: ProductSeller;
  productImages: SimpleFile[];
}

export interface ProductSummary {
  id: number;
  productCount: number;
  distance: number;
  latitude: number;
  longitude: number;
  price: number;
  title: string;
  expiredAt: string;
  createdAt: string;
  productType: ProductType;
  thumbnailUrl: string;
}

export interface GetMainPageProductsRequest {
  latitude: number;
  longitude: number;
}

export interface GetMainPageProductsResponse {
  aiRecommends: ProductSummary[];
  deadlines: ProductSummary[];
  myNeighborhoods: ProductSummary[];
}

export interface CreateProductRequest {
  imageIds: number[];
  title: string;
  name: string;
  price: number;
  type: ProductType;
  description: string;
  productCount: number;
  expiredAt: string;
}

export interface CreateProductResponse {
  id: string;
}

export interface GetProductDetailRequest {
  id: number;
}

export interface EditProductRequest extends CreateProductRequest {
  id: number;
}

export interface RemoveProductRequest {
  id: number;
}

export enum Distance {
  One = 1,
  Three = 3,
  Five = 5,
  Ten = 10,
}
export interface SearchProductsRequest extends PageRequest {
  latitude: number;
  longitude: number;
  distance?: Distance;
  category?: ProductType;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductsClient {
  getMainPageList(request: GetMainPageProductsRequest): Promise<GetMainPageProductsResponse>;
  create(request: CreateProductRequest): Promise<CreateProductResponse>;
  getDetail(request: GetProductDetailRequest): Promise<ProductDetail>;
  edit(request: EditProductRequest): Promise<ProductDetail>;
  remove(request: RemoveProductRequest): Promise<void>;
  search(request: SearchProductsRequest): Promise<PageResponse<ProductSummary>>;
}
