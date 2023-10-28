import { ProductType } from '@/api/@types/@enums';
import { ProductSummary } from '@/api/@types/Products';
import { PRODUCT_TYPE_LABEL } from '@/constants/labels';

const MOCK_COUNT = 100;

const MOCK_IMAGE_SRC =
  'https://mblogthumb-phinf.pstatic.net/MjAyMTA0MDZfMjIz/MDAxNjE3NzE0OTI5OTcx.-gRiK0jZuwfAphcsniSbvtSLBgTCs2dhI1ZDdtOgg2wg.z1slJcyP7xnKlVhyBLTHBwuEYH0HFynr3cNIcH6acKgg.JPEG.disneasy/01.jpg?type=w800';
const MOCK_COORDINATES = Array.from({ length: MOCK_COUNT }).map((_, i) => ({
  latitude: 37 + i / 1000,
  longitude: 126 + i / 1000,
}));

export const mockProducts: ProductSummary[] = Array.from({ length: MOCK_COUNT }).map((_, i) => ({
  id: i + 1,
  productCount: i + 2,
  distance: i / 10,
  latitude: MOCK_COORDINATES[i].latitude,
  longitude: MOCK_COORDINATES[i].longitude,
  price: 10000 + i * 2000,
  title: '상품',
  expiredAt: getTime(i),
  createdAt: new Date().toISOString(),
  productType: getProductType(i),
  thumbnailUrl: MOCK_IMAGE_SRC,
}));

function getTime(add: number) {
  const date = new Date();
  date.setDate(date.getDate() + add);
  return date.toISOString();
}

function getProductType(index: number) {
  const enumValues = Object.keys(PRODUCT_TYPE_LABEL);
  return enumValues[index % enumValues.length] as ProductType;
}
