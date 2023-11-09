import { PageRequest, PageResponse, ProductPurchaser } from '@/api/@types/@shared';
import { ProductSummary } from '@/api/@types/Products';

export interface SubscribePurchaserMyPageRequest {
  id: string;
}

export interface UnsubscribePurchaserMyPageRequest {
  id: string;
}

export interface PurchaserMyPageClient {
  search(): Promise<ProductPurchaser>;
  subscribe(request: SubscribePurchaserMyPageRequest): Promise<void>;
  listSearch(request: PageRequest): Promise<PageResponse<ProductSummary>>;
  unsubscribe(request: UnsubscribePurchaserMyPageRequest): Promise<void>;
}
