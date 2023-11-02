import { ProductType, ReservationStatus } from './@enums';
import { SimpleFile } from './File';
import { Coordinate, PageRequest, PageResponse } from '@/api/@types/@shared';

export interface ProductSeller {
  id: number;
  username: string;
  phone: string;
  profileImageUrl: string;
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
  status?: ReservationStatus; // 예약 상태
  isSubscribe: boolean;
  seller: ProductSeller;
  productImages: SimpleFile[];
}

export interface ProductSummary extends Coordinate {
  id: number;
  productCount: number;
  distance: number;
  price: number;
  title: string;
  expiredAt: string;
  createdAt: string;
  productType: ProductType;
  thumbnailUrl: string;
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
export interface SearchProductsRequest extends PageRequest, Coordinate {
  distance?: Distance;
  category?: ProductType;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductsClient {
  getMainPageList(request: Coordinate): Promise<GetMainPageProductsResponse>;
  create(request: CreateProductRequest): Promise<CreateProductResponse>;
  getDetail(request: GetProductDetailRequest): Promise<ProductDetail>;
  edit(request: EditProductRequest): Promise<ProductDetail>;
  remove(request: RemoveProductRequest): Promise<void>;
  search(request: SearchProductsRequest): Promise<PageResponse<ProductSummary>>;
}
