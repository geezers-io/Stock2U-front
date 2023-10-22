import { AuthVendor, UserRole } from './@enums';
import { Pageable } from '@/api/@types/@shared';

export interface SellerDetails {
  id: number;
  licenseNumber: string;
  industry: string;
  industryName: string;
  location: string;
  bankName: string;
  account: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  vendor: AuthVendor;
  sellerDetails?: SellerDetails;
}

export interface PurchaserSignUpRequest {
  username: string;
  email: string;
  phone: string;
  verification: string;
  vendor: AuthVendor;
}

export interface SignInRequest {
  authCode: string;
}
export type SignInResponse =
  | {
      exists: true;
      user: User;
    }
  | {
      exists: false;
      email?: string;
      verification: string;
    };

export interface VerifyCodeRequest {
  authCode: string;
  phone: string;
}

export interface WithDrawRequest {
  reason?: string;
}

export interface SignInURLRequest {
  vendor: AuthVendor;
}
export interface SignInURLResponse {
  url: string;
}

export interface SendCodeRequest {
  /**
   * @example 01012341234
   */
  phone: string;
}

export interface Bank {
  code: string;
  name: string;
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
  signUpPurchaser(request: PurchaserSignUpRequest): Promise<User>;
  signIn(request: SignInRequest): Promise<SignInResponse>;
  verifyCode(request: VerifyCodeRequest): Promise<void>;
  withdraw(request: WithDrawRequest): Promise<void>;
  signInURL(request: SignInURLRequest): Promise<SignInURLResponse>;
  logout(): Promise<void>;
  sendCode(request: SendCodeRequest): Promise<void>;
  getBankList(): Promise<Bank[]>;
  findAddress(request: FindAddressRequest): Promise<FindAddressResponse>;
}
