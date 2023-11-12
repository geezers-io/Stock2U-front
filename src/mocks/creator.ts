import { fakerKO } from '@faker-js/faker';
import { ReservationStatus } from '@/api/@types/@enums';
import { ChatRoomResponse } from '@/api/@types/Chat';

const randomTrueOrFalse = () => Math.random() < 0.5;
const randomReservationStatus = () => (randomTrueOrFalse() ? ReservationStatus.PROGRESS : ReservationStatus.COMPLETION);

const randomInt = (max: number = 100) => Math.ceil(Math.random() * max);

/**
 * 채팅방 생성
 */
export const createMockChatRoom = (title: string = ''): ChatRoomResponse => ({
  latestChat: {
    createdAt: new Date().toString(),
    message: fakerKO.lorem.paragraph(),
    read: randomTrueOrFalse(),
    username: fakerKO.person.fullName(),
    imageId: 1,
  },
  reservationSummary: {
    id: fakerKO.number.int(),
    uploadUrl: fakerKO.image.url(),
    title: fakerKO.commerce.product() + title,
    name: fakerKO.commerce.productName(),
    status: randomReservationStatus(),
  },
  count: randomInt(150),
});
