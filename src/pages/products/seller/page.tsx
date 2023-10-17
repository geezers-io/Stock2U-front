import { FC, useState } from 'react';
import { Flex, Heading, Input, Checkbox, CheckboxGroup, Stack, Text, Button } from '@chakra-ui/react';
import ProductImageStorage from '@/components/domains/products/ProductStorage';
import { colors } from '@/styles/theme/@colors';

const ProductRegistrationPage: FC = () => {
  const [checkedItems, setCheckedItems] = useState([false, false, false]);
  return (
    <Flex flexDirection="column" padding="1.2rem 0">
      <Heading as="h2" size="xl" textAlign="center">
        상품 등록
      </Heading>
      <ProductImageStorage /> <br />
      {/*게시 정책 설정*/}
      <Heading as="h4" size="md">
        게시 정책 설정
      </Heading>
      <CheckboxGroup colorScheme="brand.700" defaultValue={[]}>
        <Stack spacing={[1, 5]} direction={['column', 'row']}>
          <Checkbox value="onlyreservation">예약 한 건만 받기</Checkbox>
          <Checkbox value="deposit-information">예약자에게 입금 정보 보이기</Checkbox>
        </Stack>
      </CheckboxGroup>
      {/*게시글 제목*/}
      <Heading as="h4" size="md">
        게시글 제목
      </Heading>
      <Input placeholder="Basic usage" bgColor="gray.100" />
      {/*상품이름*/}
      <Heading as="h4" size="md">
        상품 이름
      </Heading>
      <Input placeholder="Basic usage" bgColor="gray.100" />
      {/*상품분류*/}
      <Heading as="h4" size="md">
        상품 분류
      </Heading>
      <CheckboxGroup colorScheme={colors.brand[700]} defaultValue={[0]}>
        <Stack spacing={[1, 5]} direction={['column', 'row']}>
          <Checkbox isChecked={checkedItems[0]} onChange={e => setCheckedItems([e.target.checked, checkedItems[1]])}>
            Child Checkbox 1
          </Checkbox>
          <Checkbox isChecked={checkedItems[1]} onChange={e => setCheckedItems([checkedItems[0], e.target.checked])}>
            Child Checkbox 2
          </Checkbox>
        </Stack>
      </CheckboxGroup>
      {/*게시마감기한*/}
      <Heading as="h4" size="md">
        게시 마감 기한
      </Heading>
      <Input placeholder="Select Date and Time" size="md" type="datetime-local" bgColor="gray.100" />
      {/*상품 상세 소개*/}
      <Heading as="h4" size="md">
        상품 상세 소개 <Text fontSize="sm">*최대 일주일 설정 가능합니다</Text>
      </Heading>
      <Input placeholder="Basic usage" bgColor="gray.100" /> <br />
      <Button color="white" bgColor={colors.brand[700]} variant="solid">
        판매글 게시하기
      </Button>
    </Flex>
  );
};

export default ProductRegistrationPage;
