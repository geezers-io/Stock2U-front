import { PageRequest, PageResponse, PurchaserGetAccountInfo } from '@/api/@types/@shared';
import { ProductSummary } from '@/api/@types/Products';

export interface PurchaserSubscribeRequest {
  id: number;
}

export interface PurchaserUnsubscribeRequest {
  id: number;
}

export interface MyClient {
  purchaserGetAccountInfo(): Promise<PurchaserGetAccountInfo>;
  purchaserSubscribe(request: PurchaserSubscribeRequest): Promise<void>;
  purchaserGetSubscribedProducts(request: PageRequest): Promise<PageResponse<ProductSummary>>;
  purchaserUnsubscribe(request: PurchaserUnsubscribeRequest): Promise<void>;
}