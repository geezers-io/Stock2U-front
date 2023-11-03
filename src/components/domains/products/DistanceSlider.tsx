import { FC } from 'react';
import { Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { Distance } from '@/api/@types/Products';

interface Props {
  value?: Distance;
  setValue: (v: Distance) => void;
}

const DistanceSlider: FC<Props> = ({ value, setValue }) => {
  const handleChange = (v: number) => {
    if (v < 1) return setValue(Distance.Half);
    if (v < 2) return setValue(Distance.One);
    if (v < 4) return setValue(Distance.Three);
    return setValue(Distance.Five);
  };

  return (
    <Slider
      step={0.5}
      min={Distance.Half}
      max={Distance.Five}
      colorScheme="brand"
      value={value}
      onChange={handleChange}
    >
      <SliderMark value={Distance.Half} mt="3" fontSize="sm">
        {Distance.Half * 1000}m
      </SliderMark>
      <SliderMark value={Distance.One} mt="3" ml="-2.5" fontSize="sm">
        {Distance.One}km
      </SliderMark>
      <SliderMark value={Distance.Three} mt="3" ml="-2.5" fontSize="sm">
        {Distance.Three}km
      </SliderMark>
      <SliderMark value={Distance.Five} mt="3" ml="-9" fontSize="sm">
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
