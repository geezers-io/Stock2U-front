import { FC, useEffect, useState } from 'react';
import {
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Divider,
} from '@chakra-ui/react';

import { MockProduct } from '@/api/__mock__/mockProduct';
import ImageUploader from '@/components/domains/products/ImageUploader';

const ProductRegistrationPage: FC = () => {
  const [MockData, setMockData] = useState<MockProduct>();

  const FetchSellerServer = async () => {
    try {
      setMockData(MockData);
    } catch (e) {}
  };

  useEffect(() => {
    FetchSellerServer();
  });

  return (
    <Flex flexDirection="column" padding="1.2rem 0" gap="20px">
      <Flex>
        <ImageUploader />
      </Flex>

      {/*게시글 제목*/}
      <FormControl isRequired>
        <FormLabel as="h4" size="md">
          게시글 제목
        </FormLabel>
        <Input placeholder="title" />
      </FormControl>
      {/*재고 이름*/}
      <FormControl isRequired>
        <FormLabel>재고 이름</FormLabel>
        <Input placeholder="name" />
      </FormControl>
      {/*재고분류*/}
      <FormControl isRequired>
        <FormLabel>재고 분류</FormLabel>
        <Select placeholder="식품">
          <option>숙소</option>
          <option>티켓</option>
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>판매 금액</FormLabel>

        <NumberInput step={5000} defaultValue={10000} min={100} max={1000000}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      {/*게시마감기한*/}
      <FormControl isRequired>
        <FormLabel>게시 마감 기한</FormLabel>
        <Input placeholder="Select Date" size="md" type="datetime-local" bgColor="gray.100" />
      </FormControl>
      {/*재고 상세 소개*/}
      <Divider />
      <FormControl>
        <FormLabel>재고 상품 상세 소개</FormLabel>
        <Textarea placeholder="상품을 소개해주세요 :)" />
      </FormControl>
      <Button color="white" colorScheme="brand" variant="solid">
        판매글 게시하기
      </Button>
    </Flex>
  );
};

export default ProductRegistrationPage;
