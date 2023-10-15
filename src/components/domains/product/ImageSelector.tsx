import { FC, useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import { MockProductDetail } from '@/api/__mock__/product';

/*const images: string[] = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
]; */
const ImageSelector: FC = () => {
  const [images, setImages] = useState<MockProductDetail>();

  const fetchImages = async () => {
    try {
      setImages(images);
    } catch (e) {}
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (!images) {
    return null;
  }

  return <ImageGallery items={images} />;
};

export default ImageSelector;
