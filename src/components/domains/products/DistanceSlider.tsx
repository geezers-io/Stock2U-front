import { FC } from 'react';
import { Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { Distance } from '@/api/@types/Products';

interface Props {
  value?: Distance;
  setValue: (v: Distance) => void;
}

const DistanceSlider: FC<Props> = ({ value, setValue }) => {
  const handleChange = (v: number) => {
    if (v < 3) return setValue(Distance.One);
    if (v < 5) return setValue(Distance.Three);
    if (v < 8) return setValue(Distance.Five);
    return setValue(Distance.Ten);
  };

  return (
    <Slider min={Distance.One} max={Distance.Ten} colorScheme="brand" value={value} onChange={handleChange}>
      <SliderMark value={Distance.One} mt="3" fontSize="sm">
        {Distance.One}km
      </SliderMark>
      <SliderMark value={Distance.Three} mt="3" ml="-2.5" fontSize="sm">
        {Distance.Three}km
      </SliderMark>
      <SliderMark value={Distance.Five} mt="3" ml="-2.5" fontSize="sm">
        {Distance.Five}km
      </SliderMark>
      <SliderMark value={Distance.Ten} mt="3" ml="-9" fontSize="sm">
        {Distance.Ten}km
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};

export default DistanceSlider;
