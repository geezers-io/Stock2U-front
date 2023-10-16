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
  representativeImageUrl:
    'https://i.namu.wiki/i/vGerI7hhhYDt3RJaR2SeH9HbcZKOVVuWsqqs3-evqTtffWDUW2lmJVp_O2f6L5MREfkIRP9CVjTSijNW3D75exJuz5a_a5V-edVPpQ5e4sEIQcj7UI_EwWxABtJof2FY4M2s1zJlHrwiOK8W3A3yxg.webp',
  subImageUrls: [
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gqkorea.co.kr%2F2023%2F07%2F22%2F%25EB%2589%25B4%25EC%25A7%2584%25EC%258A%25A4-%25EC%258B%25A0%25EB%25B3%25B4-%25EB%25B0%259C%25EB%25A7%25A4-%25EC%25B2%25AB%25EB%2582%25A0-%25EC%2596%25BC%25EB%25A7%2588%25EB%2582%2598-%25ED%258C%2594%25EB%25A0%25B8%25EC%259D%2584%25EA%25B9%258C%2F&psig=AOvVaw2eWJ6i9Pmgw28HwLIqbXfL&ust=1697380490242000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDQlZzh9YEDFQAAAAAdAAAAABAH',
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fko.wikipedia.org%2Fwiki%2FNewJeans&psig=AOvVaw0WA25DlyXMhT_Ua14FSlUK&ust=1697534883691000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPiCy7Cg-oEDFQAAAAAdAAAAABAD',
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
