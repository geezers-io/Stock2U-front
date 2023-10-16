import { FC } from 'react';
import { Flex, Heading, Input, Checkbox, CheckboxGroup, Stack, Text } from '@chakra-ui/react';
import { colors } from '@/styles/theme/@colors';

const ProductRegistrationPage: FC = () => {
  return (
    <Flex flexDirection="column" padding="1.2rem 0">
      {/*게시 정책 설정*/}
      <Heading as="h4" size="md">
        게시 정책 설정
      </Heading>
      <CheckboxGroup colorScheme={colors.brand[700]} defaultValue={[]}>
        <Stack spacing={[1, 5]} direction={['column', 'row']}>
          <Checkbox value="onlyreservation">예약 한 건만 받기</Checkbox>
          <Checkbox value="deposit-information">예약자에게 입금 정보 보이기</Checkbox>
        </Stack>
      </CheckboxGroup>

      {/*게시글 제목*/}
      <Heading as="h4" size="md">
        게시글 제목
      </Heading>
      <Input placeholder="Basic usage" />

      {/*상품이름*/}
      <Heading as="h4" size="md">
        상품 이름
      </Heading>
      <Input placeholder="Basic usage" />

      {/*상품분류*/}
      <Heading as="h4" size="md">
        상품 분류
      </Heading>
      <CheckboxGroup colorScheme={colors.brand[700]} defaultValue={[0]}>
        <Stack spacing={[1, 5]} direction={['column', 'row']}>
          <Checkbox value="food">식품</Checkbox>
          <Checkbox value="lodging">숙소</Checkbox>
          <Checkbox value="ticket">문화 티켓</Checkbox>
        </Stack>
      </CheckboxGroup>

      {/*게시마감기한*/}
      <Heading as="h4" size="md">
        게시 마감 기한
      </Heading>
      <Input placeholder="Select Date and Time" size="md" type="datetime-local" />

      {/*상품 상세 소개*/}
      <Heading as="h4" size="md">
        상품 상세 소개 <Text fontSize="sm">*최대 일주일 설정 가능합니다</Text>
      </Heading>
      <Input placeholder="Basic usage" />
    </Flex>
  );
};

export default ProductRegistrationPage;
