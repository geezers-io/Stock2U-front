import { PageRequest, PageResponse, ProductSeller } from './@shared';
import { ProductSummary } from './Products';

export interface SubscribeSellerMyPageRequest {
  id: string;
}

export interface UnsubscribeSellerMyPageRequest {
  id: string;
}

export interface SellerMyPageClient {
  search(): Promise<ProductSeller>;
  subscribe(request: SubscribeSellerMyPageRequest): Promise<void>;
  listSearch(request: PageRequest): Promise<PageResponse<ProductSummary>>;
  unsubscribe(request: UnsubscribeSellerMyPageRequest): Promise<void>;
}
