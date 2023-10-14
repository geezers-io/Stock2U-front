import { FC, useEffect, useState } from 'react';
import { MockProductDetail, mockProductDetail } from '@/api/__mock__/product';

const ImageSelector: FC = () => null;

const ProductDetailPage: FC = () => {
  const [productDetail, setProductDetail] = useState<MockProductDetail>();

  const fetchProductDetail = async () => {
    try {
      setProductDetail(mockProductDetail);
    } catch (e) {}
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  if (!productDetail) {
    return undefined;
  }
  return (
    <div>
      <ImageSelector />
    </div>
  );
};

export default ProductDetailPage;
