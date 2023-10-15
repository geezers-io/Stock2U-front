import { AuthVendor, ProductType, ReservationStatus, UserRole } from '@/api/@types/@enums';

export const AUTH_VENDOR_LABEL: Record<AuthVendor, string> = {
  [AuthVendor.GOOGLE]: '구글',
  [AuthVendor.KAKAO]: '카카오',
  [AuthVendor.NAVER]: '네이버',
};

export const PRODUCT_TYPE_LABEL: Record<ProductType, string> = {
  [ProductType.FOOD]: '식품',
  [ProductType.ACCOMMODATION]: '숙박',
  [ProductType.TICKET]: '티켓',
};

export const RESERVATION_STATUS_LABEL: Record<ReservationStatus, string> = {
  [ReservationStatus.PROGRESS]: '예약 진행중',
  [ReservationStatus.CANCEL]: '예약 취소됨',
  [ReservationStatus.COMPLETION]: '구매 완료됨',
};

export const USER_ROLE_LABEL: Record<UserRole, string> = {
  [UserRole.PURCHASER]: '구매자',
  [UserRole.SELLER]: '판매자',
  [UserRole.ADMIN]: '관리자',
};
