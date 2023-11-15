import { SellerDetails } from './Auth';
import { Coordinate, PageRequest, PageResponse, PurchaserGetAccountInfo } from '@/api/@types/@shared';
import { ProductSummary } from '@/api/@types/Products';

export interface PurchaserSubscribeRequest {
  id: number;
}

export interface PurchaserUnsubscribeRequest {
  id: number;
}

export interface SellerGetAccountInfo extends SellerDetails {
  location: string;
  bankName: string;
  account: string;
}

export interface sellerBankInfo {
  bankName: string;
  account: string;
}

export interface SellerFixedLocationInfoRequest extends Coordinate {
  location: string;
}

export interface MyClient {
  purchaserGetAccountInfo(): Promise<PurchaserGetAccountInfo>;
  purchaserSubscribe(request: PurchaserSubscribeRequest): Promise<void>;
  purchaserGetSubscribedProducts(request: PageRequest): Promise<PageResponse<ProductSummary>>;
  purchaserUnsubscribe(request: PurchaserUnsubscribeRequest): Promise<void>;
  sellerGetAccountInfo(): Promise<SellerGetAccountInfo>;
  sellerFixedBankInfo(request: sellerBankInfo): Promise<void>;
  sellerGetBankInfo(): Promise<sellerBankInfo>;
  sellerFixedLocationInfo(request: SellerFixedLocationInfoRequest): Promise<void>;
}
