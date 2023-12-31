import { AuthVendor, UserRole } from './@enums';
import { Coordinate, PageRequest } from '@/api/@types/@shared';

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

export interface SellerSignUpRequest extends Coordinate {
  username: string;
  email: string;
  licenseNumber: string;
  industry: string;
  industryName: string;
  location: string;
  bankName: string;
  account: string;
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

export interface FindAddressRequest extends PageRequest {
  keyword: string;
}
export interface Address {
  fullRoadAddrName: string;
  roadAddrPart1: string;
  roadAddrPart2: string;
  zipCode: number;
  buildingName: string;
}
export interface AddressPageResponse {
  // NOTE: 이 API 페이지네이션 응답만 공용 페이지네이션 응답과 형상이 다름
  countPerPage: number;
  totalCount: number;
  currentPage: number;
}
export interface FindAddressResponse {
  page: AddressPageResponse;
  results: Address[];
}

type SignInDevParam = { who: 'Patt' | 'Matt' };

export interface AuthClient {
  signUpPurchaser(request: PurchaserSignUpRequest): Promise<User>;
  signUpSeller(request: SellerSignUpRequest): Promise<User>;
  signIn(request: SignInRequest): Promise<SignInResponse>;
  signInDev(req: SignInDevParam): Promise<SignInResponse>;
  verifyCode(request: VerifyCodeRequest): Promise<void>;
  withdraw(request: WithDrawRequest): Promise<void>;
  signInURL(request: SignInURLRequest): Promise<SignInURLResponse>;
  logout(): Promise<void>;
  sendCode(request: SendCodeRequest): Promise<void>;
  getBankList(): Promise<Bank[]>;
  findAddress(request: FindAddressRequest): Promise<FindAddressResponse>;
}
