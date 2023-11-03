import { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { ProductType } from '@/api/@types/@enums';
import { SimpleFile } from '@/api/@types/File';
import { CreateProductRequest } from '@/api/@types/Products';
import { ProductsService } from '@/api/services/Products';
import ImageUploader from '@/components/domains/products/ImageUploader';
import { PRODUCT_TYPE_LABEL } from '@/constants/labels';
import { MAX_INT } from '@/constants/number';
import { PRODUCT_MIN_PRICE, PRODUCT_MAX_COUNT, PRODUCT_MIN_TEXT, PRODUCT_MAX_TEXT } from '@/constants/product';
import { useCustomToast } from '@/hooks/useCustomToast';
import { generateValidators } from '@/utils/formik';

type FormValues = Omit<CreateProductRequest, 'imagesId'>;

const { validators, getFormikStates } = generateValidators<FormValues>({
  title: { required: true, range: { min: 4, max: 30 }, regex: 'korEngNumSpace' },
  name: { required: true, range: { max: 20 }, regex: 'korEngNumSpace' },
  price: { required: true, range: { min: PRODUCT_MIN_PRICE, max: MAX_INT } },
  type: { required: true },
  description: { required: true, range: { min: 3, max: 1000 }, regex: 'korEngNumSpace' },
  productCount: { required: true, range: { min: 1, max: PRODUCT_MAX_COUNT } },
  expiredAt: { required: true, range: { min: PRODUCT_MIN_TEXT, max: PRODUCT_MAX_TEXT } },
});

const ProductRegistrationPage: FC = () => {
  const toast = useCustomToast();
  const [images, setImages] = useState<SimpleFile[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (values: FormValues) => {
    if (!images.length) {
      return;
    }

    try {
      const { id } = await ProductsService.create({
        ...values,
        imageIds: images.map(image => image.id),
      });
      navigate(`/products/${id}`);
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <Formik<FormValues>
      initialValues={{
        title: '',
        name: '',
        price: 1000,
        type: null as unknown as ProductType,
        description: '',
        productCount: 1,
        expiredAt: '',
        imageIds: [],
      }}
      onSubmit={handleSubmit}
    >
      {props => {
        const { showErrorDict, canSubmit, errors, values } = getFormikStates(props);
        return (
          <Form>
            <Flex flexDirection="column" padding="1.2rem 0" gap="20px">
              <Flex>
                <ImageUploader images={images} setImages={setImages} />
              </Flex>

              {/*게시글 제목*/}
              <Field name="title" validate={validators.title}>
                {({ field }) => (
                  <FormControl isRequired isInvalid={showErrorDict.title}>
                    <FormLabel as="h4" size="md">
                      게시글 제목
                    </FormLabel>
                    <FormHelperText>글자 수는 4~30자 입니다.</FormHelperText>
                    <Input {...field} />
                    <FormErrorMessage>{errors.title}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/*재고 이름*/}
              <Field name="name" validate={validators.name}>
                {({ field }) => (
                  <FormControl isRequired isInvalid={showErrorDict.name}>
                    <FormLabel as="h4" size="md">
                      재고 이름
                    </FormLabel>
                    <FormHelperText>글자 수는 20자 이하여야 합니다.</FormHelperText>
                    <Input {...field} />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/*재고분류*/}
              <Field name="type" validate={validators.type}>
                {({ field }) => (
                  <FormControl isRequired isInvalid={showErrorDict.type}>
                    <FormLabel as="h4" size="md">
                      재고 분류
                    </FormLabel>
                    <Select {...field} color={values.type ? undefined : 'gray.500'}>
                      <option selected hidden disabled value="">
                        -- 분류 선택 --
                      </option>
                      {Object.entries(PRODUCT_TYPE_LABEL).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{errors.type}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* 판매 금액 */}
              <Field name="price" validate={validators.price}>
                {({ field }) => (
                  <FormControl isRequired isInvalid={showErrorDict.price}>
                    <FormLabel>판매 금액</FormLabel>
                    <FormHelperText>금액은 {PRODUCT_MIN_PRICE}원 이상이어야 합니다.</FormHelperText>
                    <Input {...field} type="number" />
                    <FormErrorMessage>{errors.price}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* 판매 수량*/}
              <Field name="productCount" validate={validators.productCount}>
                {({ field }) => (
                  <FormControl isRequired isInvalid={showErrorDict.productCount}>
                    <FormLabel>판매 수량</FormLabel>
                    <FormHelperText>수량은 {PRODUCT_MAX_COUNT}개 이하여야 합니다.</FormHelperText>
                    <Input {...field} type="number" />
                    <FormErrorMessage>{errors.productCount}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/*게시마감기한*/}
              <Field name="expiredAt" validate={validators.expiredAt}>
                {({ field }) => (
                  <FormControl isRequired>
                    <FormLabel>게시 마감 기한</FormLabel>
                    <Input {...field} placeholder="Select Date" size="md" type="datetime-local" />
                    <FormErrorMessage>{errors.expiredAt}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/*재고 상세 소개*/}
              <Divider />
              <Field name="description" validate={validators.description}>
                {({ field }) => (
                  <FormControl isRequired isInvalid={showErrorDict.description}>
                    <FormLabel>재고 상품 상세 소개</FormLabel>
                    <FormHelperText>
                      글자 수는 {PRODUCT_MIN_TEXT} ~ {PRODUCT_MAX_TEXT}자입니다.
                    </FormHelperText>
                    <Textarea {...field} placeholder="상품을 소개해주세요 :)" rows={8} />
                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                type="submit"
                color="white"
                colorScheme="brand"
                variant="solid"
                isDisabled={!canSubmit || !images.length}
              >
                판매글 게시하기
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProductRegistrationPage;
