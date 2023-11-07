import { ReservationStatus } from '@/api/@types/@enums';
import { PageRequest, PageResponse } from '@/api/@types/@shared';

export interface ChatRoomResponse {
  latestChat: Message;
  reservationSummary: ReservationSummary;
}

export interface ReservationSummary {
  id: number;
  title: string;
  name: string; // 상품 이름
  status: ReservationStatus; // 예약 상태
  uploadUrl: string;
}

export interface Message {
  username: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface GetChatRoomsRequest extends PageRequest {
  title?: string;
}

export interface ChatClient {
  onDebug(): void;
  getChatRooms(req: GetChatRoomsRequest): Promise<PageResponse<ChatRoomResponse>>;
}
