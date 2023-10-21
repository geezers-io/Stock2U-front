import { ProductType } from '@/api/@types/@enums';

interface MockSeller {
  id: number;
  nickname: string;
  stockCount: number;
  reviewCount: number;
}

export interface MockProductDetail {
  id: number;
  title: string;
  representativeImageUrl: string;
  subImageUrls: string[];
  stockName: string;
  productType: ProductType;
  price: number;
  expiredAt: Date;
  date: string;
  detail: string;
  seller: MockSeller;
}

export const mockProductDetail: MockProductDetail = {
  id: 1,
  title: '아이유 티켓 공연 1장 판매',
  representativeImageUrl: 'https://cdn.mindgil.com/news/photo/202005/69269_3261_1638.jpg',
  subImageUrls: [
    'https://gongbuhae.com/storage/app/public/editor/3a/e5/20211123180357accf102caaa970ce65d217b9ae9a8e9a57caa67c.jpg',
    'https://m.damggo.com/web/product/big/202208/c2f36c7d36943b4cad5ecf2c857efaac.jpg',
    'https://cdn.mindgil.com/news/photo/202005/69269_3261_1638.jpg',
  ],
  stockName: '7월 아이유 송도축제 공연 티켓',
  productType: ProductType.TICKET,
  price: 10000,
  expiredAt: new Date('2023-09-16T17:50'),
  date: '2022-09-10',
  detail:
    '제가 LA에 있을때는 말이죠 정말 제가 꿈에 무대인 메이저리그로 진출해서 가는 식당마다 싸인해달라 기자들은 항상 붙어다니며 취재하고 제가 그 머~ 어~ 대통령이 된 기분이였어요 그런데 17일만에 17일만에 마이너리그로 떨어졌어요',
  seller: {
    id: 12,
    nickname: '우리동네LA형',
    stockCount: 5000,
    reviewCount: 0,
  },
};
