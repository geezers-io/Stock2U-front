import { FC, useState } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { Distance, SearchProductsRequest } from '@/api/@types/Products';
import DistanceSlider from '@/components/domains/products/DistanceSlider';
import PriceSlider from '@/components/domains/products/PriceSlider';

export type FilterValues = Required<Pick<SearchProductsRequest, 'distance' | 'minPrice'>> &
  Pick<SearchProductsRequest, 'maxPrice'>;

interface Props {
  isOpen: boolean;
  close: () => void;
  onOk: (values: FilterValues) => void;
  initialValues: FilterValues;
}

const SearchFilterDrawer: FC<Props> = ({ isOpen, close, onOk, initialValues }) => {
  const [values, setValues] = useState<FilterValues>(initialValues);

  const changeHandlers = {
    distance: (v: Distance) => setValues(prev => ({ ...prev, distance: v })),
    price: ([minPrice, maxPrice]: [number, number | undefined]) => setValues(prev => ({ ...prev, minPrice, maxPrice })),
  };

  const handleOk = () => {
    onOk(values);
    close();
  };

  return (
    <Drawer isOpen={isOpen} onClose={close} placement="bottom">
      <DrawerOverlay />
      <DrawerContent h="100vh">
        <DrawerCloseButton size="lg" right="10px" color="gray.600" zIndex={1} />
        <DrawerHeader>필터</DrawerHeader>

        <DrawerBody transitionDuration="400ms">
          <Flex w="100%" h="100%" flexDirection="column" pt={4} gap={12}>
            {/* TODO: search 요청에 관련 필드 없음. 기능에서 빠지는건지? */}
            {/*<Flex flexDirection="column" gap={4}>*/}
            {/*  <Heading fontSize="xl">시간</Heading>*/}
            {/*  <Switch size="lg">마감 임박 순으로 보기</Switch>*/}
            {/*</Flex>*/}

            <Flex flexDirection="column" gap={4}>
              <Heading fontSize="xl">위치</Heading>
              <DistanceSlider value={values.distance} setValue={changeHandlers.distance} />
            </Flex>

            <Flex flexDirection="column" gap={4}>
              <Heading fontSize="xl">가격</Heading>
              <PriceSlider value={[values.minPrice, values.maxPrice]} setValue={changeHandlers.price} />
            </Flex>
          </Flex>
        </DrawerBody>

        <DrawerFooter boxShadow="rgba(0, 0, 0, 0.16) 0px 0px 5px 0px">
          <Button size="lg" w="full" colorScheme="brand" onClick={handleOk}>
            필터 적용하기
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchFilterDrawer;
