import { ReservationStatus } from './@enums';

export interface CreateReservationRequest {
  productId: string;
}

export interface CancelReservationRequest {
  reservationId: string;
}

export interface ApproveReservationRequest {
  productId: string;
  roomId: string;
}

export interface SearchReservationRequest {
  title?: string;
  page: number;
  size: number;
}

export interface LatestChat {
  username: string;
  message: string;
  createdAt: string;
}

export interface ReservationSummary {
  id: number;
  title: string;
  name: string;
  status: ReservationStatus;
  uploadUrl: string;
}

export interface Content {
  latestChat: LatestChat;
  reservationSummary: ReservationSummary[];
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pagerable {
  offset: number;
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface SearchReservationResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Content[];
  number: number;
  sort: Sort;
  pagerable: Pagerable[];
  first: boolean;
  last: boolean;
  numberOfElement: number;
  empty: boolean;
}

export interface DeclaredReservationRequest {
  reason: string;
  roomId: string;
}

export interface CommonSearchReservationRequest {
  startDate: string;
  endDate: string;
  page: number;
  size: number;
}

export interface ChangeReservationRequest {
  status: string;
  reservationId: string;
}

export interface ChangeReservationResponse {
  status: ReservationStatus;
}

export interface ReservationClient {
  create(request: CreateReservationRequest): Promise<void>;
  cancel(request: CancelReservationRequest): Promise<void>;
  approve(request: ApproveReservationRequest): Promise<void>;
  search(request: SearchReservationRequest): Promise<SearchReservationResponse>;
  declared(request: DeclaredReservationRequest): Promise<void>;
  commonSearch(request: CommonSearchReservationRequest): Promise<SearchReservationResponse>;
  change(request: ChangeReservationRequest): Promise<ChangeReservationResponse>;
}
