import { ProductType, ReservationStatus } from '@/api/@types/@enums';

export interface MockProduct {
  id: number; // [PK, increment]
  title: string; // [note: '게시글 제목']
  name: string; // [note: '잔여 재고 이름']
  type: ProductType; // [note: '잔여 재고 분류']
  userId: number; // [note: '사용자 FK']
  description: string; // [note: '상품 설명']
  checkOnlyOneReserve: boolean; // [note: '예약 한 건만 받기']
  showAccountDetails: boolean; // [note: '예약자에게 입금 정보 보이기']
  expiredAt: Date; // [note: '게시 마감 기한']
  status?: ReservationStatus; // [note: '판매 상태']
  latitude: number; // [note: '위도']
  longtitude: number; // [note: '경도']
  price: number;
  imageSRC: string;
}

const MOCK_IMAGE_SRC =
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80';

export const mockProducts: MockProduct[] = [
  {
    id: 1,
    title: 'title 1 long long long long long long long long long long',
    name: 'name 1',
    type: ProductType.FOOD,
    userId: 1,
    description: 'description 2',
    checkOnlyOneReserve: false,
    showAccountDetails: false,
    expiredAt: new Date('2023-10-20'),
    status: ReservationStatus.PROGRESS,
    latitude: 0,
    longtitude: 0,
    price: 10000,
    imageSRC: MOCK_IMAGE_SRC,
  },
  {
    id: 2,
    title: 'title 2 loooooooooooooooooooooooooooooooooooooooong',
    name: 'name 2',
    type: ProductType.TICKET,
    userId: 2,
    description: 'description 2',
    checkOnlyOneReserve: false,
    showAccountDetails: false,
    expiredAt: new Date('2023-10-16'),
    status: ReservationStatus.COMPLETION,
    latitude: 0,
    longtitude: 0,
    price: 10000,
    imageSRC: MOCK_IMAGE_SRC,
  },
  {
    id: 3,
    title: 'title 3',
    name: 'name 3',
    type: ProductType.ACCOMMODATION,
    userId: 3,
    description: 'description 3',
    checkOnlyOneReserve: false,
    showAccountDetails: false,
    expiredAt: new Date('2023-10-15T12:00'),
    status: ReservationStatus.COMPLETION,
    latitude: 0,
    longtitude: 0,
    price: 10000,
    imageSRC: MOCK_IMAGE_SRC,
  },
  {
    id: 4,
    title: 'title 1',
    name: 'name 1',
    type: ProductType.FOOD,
    userId: 1,
    description: 'description 2',
    checkOnlyOneReserve: false,
    showAccountDetails: false,
    expiredAt: new Date('2023-10-20'),
    status: ReservationStatus.PROGRESS,
    latitude: 0,
    longtitude: 0,
    price: 10000,
    imageSRC: MOCK_IMAGE_SRC,
  },
  {
    id: 5,
    title: 'title 2',
    name: 'name 2',
    type: ProductType.TICKET,
    userId: 2,
    description: 'description 2',
    checkOnlyOneReserve: false,
    showAccountDetails: false,
    expiredAt: new Date('2023-10-16'),
    status: ReservationStatus.COMPLETION,
    latitude: 0,
    longtitude: 0,
    price: 10000,
    imageSRC: MOCK_IMAGE_SRC,
  },
  {
    id: 6,
    title: 'title 3',
    name: 'name 3',
    type: ProductType.ACCOMMODATION,
    userId: 3,
    description: 'description 3',
    checkOnlyOneReserve: false,
    showAccountDetails: false,
    expiredAt: new Date('2023-10-15T12:00'),
    status: ReservationStatus.COMPLETION,
    latitude: 0,
    longtitude: 0,
    price: 10000,
    imageSRC: MOCK_IMAGE_SRC,
  },
  {
    id: 7,
    title: 'title 1',
    name: 'name 1',
    type: ProductType.FOOD,
    userId: 1,
    description: 'description 2',
    checkOnlyOneReserve: false,
    showAccountDetails: false,
    expiredAt: new Date('2023-10-20'),
    status: ReservationStatus.PROGRESS,
    latitude: 0,
    longtitude: 0,
    price: 10000,
    imageSRC: MOCK_IMAGE_SRC,
  },
  {
    id: 8,
    title: 'title 2',
    name: 'name 2',
    type: ProductType.TICKET,
    userId: 2,
    description: 'description 2',
    checkOnlyOneReserve: false,
    showAccountDetails: false,
    expiredAt: new Date('2023-10-16'),
    status: ReservationStatus.COMPLETION,
    latitude: 0,
    longtitude: 0,
    price: 10000,
    imageSRC: MOCK_IMAGE_SRC,
  },
  {
    id: 9,
    title: 'title 3',
    name: 'name 3',
    type: ProductType.ACCOMMODATION,
    userId: 3,
    description: 'description 3',
    checkOnlyOneReserve: false,
    showAccountDetails: false,
    expiredAt: new Date('2023-10-15T12:00'),
    status: ReservationStatus.COMPLETION,
    latitude: 0,
    longtitude: 0,
    price: 10000,
    imageSRC: MOCK_IMAGE_SRC,
  },
];
