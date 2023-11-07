import { fakerKO } from '@faker-js/faker';
import { ReservationStatus } from '@/api/@types/@enums';
import { ChatRoomResponse } from '@/api/@types/Chat';

const randomTrueOrFalse = () => Math.random() < 0.5;
const randomReservationStatus = () => (randomTrueOrFalse() ? ReservationStatus.PROGRESS : ReservationStatus.COMPLETION);

/**
 * 채팅방 생성
 */
export const createMockChatRoom = (): ChatRoomResponse => ({
  latestChat: {
    createdAt: new Date(),
    message: fakerKO.lorem.paragraph(),
    read: randomTrueOrFalse(),
    username: fakerKO.person.fullName(),
  },
  reservationSummary: {
    id: fakerKO.number.int(),
    uploadUrl: fakerKO.image.url(),
    title: fakerKO.commerce.product(),
    name: fakerKO.commerce.productName(),
    status: randomReservationStatus(),
  },
});
