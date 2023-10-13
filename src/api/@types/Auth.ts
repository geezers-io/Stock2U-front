import { AuthVendor } from './@enums';
import { Pageable } from '@/api/@types/@shared';

export interface LoginRequest {
  token: string;
}
export interface LoginResponse {
  exists: boolean;
  email?: string;
}

export interface VerifyCodeRequest {
  authCode: string;
  phone: string;
}

export interface LoginURLRequest {
  vendor: AuthVendor;
}
export interface LoginURLResponse {
  url: string;
}

export interface SendCodeRequest {
  /**
   * @example 01012341234
   */
  phone: string;
}

export interface FindAddressRequest {
  keyword: string;
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
export interface Address {
  fullRoadAddrName: string;
  roadAddrPart1: string;
  roadAddrPart2: string;
  zipCode: number;
  buildingName: string;
}
export interface FindAddressResponse {
  page: Pageable;
  results: Address[];
}

export interface AuthClient {
  login(request: LoginRequest): Promise<LoginResponse>;
  verifyCode(request: VerifyCodeRequest): Promise<void>;
  loginURL(request: LoginURLRequest): Promise<LoginURLResponse>;
  sendCode(request: SendCodeRequest): Promise<void>;
  findAddress(request: FindAddressRequest): Promise<FindAddressResponse>;
}
