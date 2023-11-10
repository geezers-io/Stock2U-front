import { ReservationStatus } from './@enums';
import { PageRequest, PageResponse } from './@shared';
import { ProductSummary } from './Products';

export interface CreateReservationRequest {
  productId: number;
}

export interface CreateReservationResponse {
  id: number;
}

export interface CancelReservationRequest {
  reservationId: string;
}

export interface ApproveReservationRequest {
  productId: string;
  roomId: string;
}

export interface ApproveReservationResponse {
  progress: ReservationStatus[];
}

export interface SearchReservationRequest extends PageRequest {
  title?: string;
}

export interface LatestChat {
  username: string;
  message: string;
  createdAt: string;
}

export interface DeclaredReservationRequest {
  reason: string;
  roomId: string;
}

export interface CommonSearchReservationRequest extends PageRequest {
  startDate: string;
  endDate: string;
}

export interface ChangeReservationRequest {
  status: string;
  reservationId: string;
}

export interface ChangeReservationResponse {
  status: ReservationStatus;
}

export interface ReservationClient {
  create(request: CreateReservationRequest): Promise<CreateReservationResponse>;
  cancel(request: CancelReservationRequest): Promise<void>;
  approve(request: ApproveReservationRequest): Promise<ApproveReservationResponse>;
  search(request: SearchReservationRequest): Promise<PageResponse<ProductSummary>>;
  declared(request: DeclaredReservationRequest): Promise<void>;
  commonSearch(request: CommonSearchReservationRequest): Promise<PageResponse<ProductSummary>>;
  change(request: ChangeReservationRequest): Promise<ChangeReservationResponse>;
}
