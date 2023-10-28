import { FC } from 'react';
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderMark,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react';
import { MIN_PRICE } from '@/constants/product';

type MinPrice = number;
type MaxPrice = number | undefined;
interface Props {
  value: [MinPrice, MaxPrice];
  setValue: (v: [MinPrice, MaxPrice]) => void;
}

const MAX_CRITICAL_POINT = 100000;
const PriceSlider: FC<Props> = ({ value, setValue }) => {
  const maxPoint = Math.min(value[1] ?? Infinity, MAX_CRITICAL_POINT);
  const isOnMaxPoint = maxPoint >= MAX_CRITICAL_POINT;

  const handleChange = ([minPrice, maxPrice]: number[]) => {
    setValue([minPrice, maxPrice >= MAX_CRITICAL_POINT ? undefined : maxPrice]);
  };

  return (
    <RangeSlider
      colorScheme="brand"
      step={(MAX_CRITICAL_POINT / MIN_PRICE) * 10}
      min={MIN_PRICE}
      max={MAX_CRITICAL_POINT}
      value={[value[0], maxPoint]}
      onChange={handleChange}
    >
      <RangeSliderMark value={MIN_PRICE} mt="3" fontSize="sm">
        {value[0]}원
      </RangeSliderMark>
      <RangeSliderMark
        value={MAX_CRITICAL_POINT}
        mt="3"
        ml={isOnMaxPoint ? '-5.7rem' : '-3.6rem'}
        fontSize="sm"
        whiteSpace="nowrap"
      >
        {value[1] ?? MAX_CRITICAL_POINT}원{isOnMaxPoint && ' 이상'}
      </RangeSliderMark>
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
    </RangeSlider>
  );
};

export default PriceSlider;
