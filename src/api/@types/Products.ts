import { ProductType, ReservationStatus } from './@enums';
import { SellerDetails } from './Auth';
import { SimpleFile } from './File';

export interface ProductSeller {
  id: number;
  username: string;
  phone: string;
  salesCount?: number; //여기 물음표가 맞을까
  reviewCount?: number;
}

//getMainProductsList
export interface aiRecommends {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  distance: number;
  createdAt: Date;
  price: number;
  expiredAt: Date;
  productType: ProductType;
  thumbnailUrl: string;
}

export interface GetMainProductsPostListRequest {
  latitude: number;
  longitude: number;
}

export interface GetMainProductsPostListResponse {
  aiRecommends: aiRecommends;
  deadlines: aiRecommends;
  myNeighborhoods: aiRecommends;
}

//createproducts
export interface CreateProductPostRequest {
  imageIds: number[];
  title: string;
  name: string;
  price: number;
  type: ProductType;
  description: string;
  productCount: number;
  expiredAt: Date;
}

export interface CreateProductsPostResponse {
  id: string;
}

//getProductsDetail
export interface GetProductsDetailRequest {
  id: number;
}
export interface GetProductsDetailResponse {
  id: number;
  title: string;
  price: number;
  type: ProductType;
  description: string;
  productCount: number;
  expiredAt: Date;
  status?: ReservationStatus; // 예약 상태(예약 한 건만 받기 체크 && 예약 진행 중일 시 표기 됨)
  seller: ProductSeller;
  productImages: SimpleFile[];
}

//modified
export interface ModifiedProductsPostRequest {
  id: number; // 이게 맞을까
  imageIds: number[];
  title: string;
  name: string;
  price: number;
  type: ProductType;
  description: string;
  productCount: number;
  expiredAt: Date;
}

export interface ModifiedProductsPostResponse {
  imageIds: number[];
  title: string;
  name: string;
  price: number;
  type: ProductType;
  description: string;
  productCount: number;
  expiredAt: Date;
  seller: SellerDetails;
  productsImages: SimpleFile[];
}

//delete
export interface DeleteProductsRequest {
  id: number;
}

//Filtering
export interface GetFilteringOfProductsPostListRequest {
  latitude: number;
  longitude: number;
  distance?: number;
  category: ProductType;
  minPrice?: number;
  maxPrice?: number;
  page: number;
  /**
   * @example 0 ~
   */
  size: number;
}

export interface Content {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  distance: number;
  createdAt: Date;
  price: number;
  expiredAt: Date;
  productType: ProductType;
  thumbnailUrl: string;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: string;
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface GetFilteringOfProductsPostListResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Content;
  number: number;
  sort: Sort;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface ProductsClient {
  getMainPostList(request: GetMainProductsPostListRequest): Promise<GetMainProductsPostListResponse>;
  createPost(request: CreateProductPostRequest): Promise<CreateProductsPostResponse>;
  getDetail(request: GetProductsDetailRequest): Promise<GetProductsDetailResponse>;
  modified(request: ModifiedProductsPostRequest): Promise<ModifiedProductsPostResponse>;
  delete(request: DeleteProductsRequest): Promise<void>;
  getFilteringOfPostList(
    request: GetFilteringOfProductsPostListRequest,
  ): Promise<GetFilteringOfProductsPostListResponse>;
}
