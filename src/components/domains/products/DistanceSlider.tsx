import { FC } from 'react';
import { Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { Distance } from '@/api/@types/Products';

interface Props {
  value?: Distance;
  setValue: (v: Distance) => void;
}

const valueConvertor = {
  toDistance: (v: number): Distance => {
    if (v < 1) return Distance.Half;
    if (v < 3.5) return Distance.One;
    if (v < 7.5) return Distance.Three;
    return Distance.Five;
  },
  fromDistance: (v?: Distance): number => {
    if (typeof v === 'undefined' || Distance.Half === v) return 0;
    if (Distance.One === v) return 2;
    if (Distance.Three === v) return 5;
    return 10;
  },
};

const DistanceSlider: FC<Props> = ({ value, setValue }) => {
  const handleChange = (v: number) => {
    setValue(valueConvertor.toDistance(v));
  };

  return (
    <Slider
      step={0.5}
      min={0}
      max={10}
      colorScheme="brand"
      value={valueConvertor.fromDistance(value)}
      onChange={handleChange}
    >
      <SliderMark value={valueConvertor.fromDistance(Distance.Half)} mt="3" fontSize="sm">
        {Distance.Half * 1000}m
      </SliderMark>
      <SliderMark value={valueConvertor.fromDistance(Distance.One)} mt="3" ml="-2.5" fontSize="sm">
        {Distance.One}km
      </SliderMark>
      <SliderMark value={valueConvertor.fromDistance(Distance.Three)} mt="3" ml="-2.5" fontSize="sm">
        {Distance.Three}km
      </SliderMark>
      <SliderMark value={valueConvertor.fromDistance(Distance.Five)} mt="3" ml="-9" fontSize="sm">
        {Distance.Five}km
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};

export default DistanceSlider;
