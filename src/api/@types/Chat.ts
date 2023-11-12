import { ReservationStatus } from '@/api/@types/@enums';
import { PageRequest, PageResponse } from '@/api/@types/@shared';

export interface ChatRoomResponse {
  latestChat: OutsideChatMessage;
  reservationSummary: ReservationSummary;
  count: number;
}

export interface ReservationSummary {
  id: number;
  title: string;
  name: string; // 상품 이름
  status: ReservationStatus; // 예약 상태
  uploadUrl: string;
}

export interface OutsideChatMessage {
  username: string;
  message: string;
  read: boolean;
  createdAt: string;
  imageId: number;
}

export interface GetChatRoomsRequest extends PageRequest {
  title?: string;
}

export enum ChatRoomAlertType {
  // For Inner Management
  FORCE_UPDATE = 'FORCE_UPDATE',

  // For Server Message
  CREATION = 'CREATION',
  MESSAGE = 'MESSAGE',
  CANCEL = 'CANCEL',
  PROGRESS = 'PROGRESS',
  COMPLETION = 'COMPLETION',
}

/**
 * 채팅 알림
 */
export interface ChatPubAlert {
  type: ChatRoomAlertType;
  userName: string;
  userId: number;
  message: string;
  reservationId: number;
  chatRoomSummary?: ChatRoomResponse;
}

export interface ChatClient {
  onDebug(): void;
  getChatRooms(req: GetChatRoomsRequest): Promise<PageResponse<ChatRoomResponse>>;
}
