import { FC, MouseEventHandler, useLayoutEffect, useState } from 'react';
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Select, useDisclosure } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { AuthVendor } from '@/api/@types/@enums';
import { Bank, SellerSignUpRequest } from '@/api/@types/Auth';
import { AuthService } from '@/api/services/Auth';
import AddressFinderModal from '@/components/domains/auth/AddressFinderModal';
import VerificationDrawer from '@/components/domains/auth/VerificationDrawer';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useRedirect } from '@/hooks/useRedirect';
import { useSearchParamsObject } from '@/hooks/useSearchParamsObject';
import { useBoundedStore } from '@/stores';
import { generateValidators } from '@/utils/formik';

type FormValues = Omit<SellerSignUpRequest, 'verification' | 'vendor' | 'latitude' | 'longtitude'>;

const { validators, getFormikStates } = generateValidators<FormValues>({
  username: { required: true, range: { min: 3, max: 15 }, regex: 'nickname' },
  email: { required: true, regex: 'email' },
  phone: { required: true, regex: 'phone' },
  licenseNumber: { required: true, regex: 'licenseNumber' },
  industry: { required: true },
  industryName: { required: true },
  location: { required: true },
  bankName: { required: true },
  account: { required: true, regex: 'account' },
});

// TODO: Step 방식으로 변경하기
// TODO: 이메일 컴포넌트 별도로 만들어서 적용하기
const SellerSignUpPage: FC = () => {
  const setUser = useBoundedStore(state => state.setUser);
  const { redirect } = useRedirect();
  const toast = useCustomToast();
  const [banks, setBanks] = useState<Bank[]>([]);
  const [{ email, verification, vendor }] = useSearchParamsObject();
  const {
    isOpen: verificationDrawerOpen,
    onOpen: openVerificationDrawer,
    onClose: closeVerificationDrawer,
  } = useDisclosure();
  const {
    isOpen: addressFinderModalOpen,
    onOpen: openAddressFinderModal,
    onClose: closeAddressFinderModal,
  } = useDisclosure();

  const signUp = async (values: FormValues) => {
    if (!verification || !vendor) {
      return;
    }

    try {
      const user = await AuthService.signUpSeller({
        ...values,
        phone: values.phone.replace(/-/g, ''),
        licenseNumber: values.licenseNumber.replace(/-/g, ''),
        account: values.account.replace(/-/g, ''),
        verification,
        vendor: vendor as AuthVendor,
      });
      setUser(user);
      redirect();
    } catch (e) {
      toast.error(e);
    }
  };

  const handleClickAddress: MouseEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    openAddressFinderModal();
  };

  const fetchBankList = async () => {
    try {
      const banks = await AuthService.getBankList();
      setBanks(banks);
    } catch (e) {
      toast.error(e);
    }
  };

  useLayoutEffect(() => {
    fetchBankList();
  }, []);

  useLayoutEffect(() => {
    if (!verification || !vendor) {
      redirect();
    }
  }, [verification, vendor]);

  if (!verification || !vendor) {
    return null;
  }
  return (
    <Formik<FormValues>
      initialValues={{
        username: '',
        email: email ?? '',
        phone: '',
        licenseNumber: '',
        industry: '',
        industryName: '',
        location: '',
        bankName: '',
        account: '',
      }}
      onSubmit={openVerificationDrawer}
    >
      {props => {
        const { showErrorDict, canSubmit, errors, values, setFieldValue } = getFormikStates(props);

        return (
          <Form style={{ paddingTop: 40, paddingBottom: 40 }}>
            <Flex flexDirection="column" gap="20px" maxW="500px" margin="0 auto">
              <Field name="username" validate={validators.username}>
                {({ field }) => (
                  <FormControl isRequired isInvalid={showErrorDict.username}>
                    <FormLabel>닉네임</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="email" validate={validators.email}>
                {({ field }) => (
                  <FormControl isRequired isInvalid={showErrorDict.email}>
                    <FormLabel>이메일</FormLabel>
                    <Input {...field} type="email" />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="phone" validate={validators.phone}>
                {({ field }) => (
                  <FormControl isRequired isInvalid={showErrorDict.phone}>
                    <FormLabel>휴대폰 번호</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{errors.phone}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="industry" validate={validators.industry}>
                {({ field }) => (
                  <FormControl isRequired isInvalid={showErrorDict.industry}>
                    <FormLabel>업종</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{errors.industry}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="industryName" validate={validators.industryName}>
                {({ field }) => (
                  <FormControl isRequired isInvalid={showErrorDict.industryName}>
                    <FormLabel>가게 이름</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{errors.industryName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="location" validate={validators.location}>
                {({ field }) => (
                  <FormControl isRequired isInvalid={showErrorDict.location} onClick={handleClickAddress}>
                    <FormLabel>가게 위치</FormLabel>
                    <Input {...field} readOnly />
                    <FormErrorMessage>{errors.location}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="licenseNumber" validate={validators.licenseNumber}>
                {({ field }) => (
                  <FormControl isRequired isInvalid={showErrorDict.licenseNumber}>
                    <FormLabel>사업자 등록번호</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{errors.licenseNumber}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Flex gap="20px" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                <Field name="bankName" validate={validators.bankName}>
                  {({ field }) => (
                    <FormControl isRequired isInvalid={showErrorDict.bankName} w="auto" minW="200px">
                      <FormLabel>은행</FormLabel>
                      <Select {...field} color={values.bankName ? undefined : 'gray.500'}>
                        <option selected hidden disabled value="">
                          -- 은행 선택 --
                        </option>
                        {banks.map(bank => (
                          <option key={bank.name} value={bank.name}>
                            {bank.name}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>{errors.bankName}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="account" validate={validators.account} flex={1} w="auto">
                  {({ field }) => (
                    <FormControl isRequired isInvalid={showErrorDict.account}>
                      <FormLabel>계좌번호</FormLabel>
                      <Input {...field} />
                      <FormErrorMessage>{errors.account}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Flex>

              <Button type="submit" size="lg" colorScheme="brand" isDisabled={!canSubmit} mt={4}>
                가입하기
              </Button>

              <AddressFinderModal
                title="가게 위치"
                isOpen={addressFinderModalOpen}
                close={closeAddressFinderModal}
                onSelect={async address => {
                  closeAddressFinderModal();
                  await setFieldValue('location', address);
                }}
              />
              <VerificationDrawer
                isOpen={verificationDrawerOpen}
                close={closeVerificationDrawer}
                phone={values.phone}
                onSuccess={async () => {
                  closeVerificationDrawer();
                  await signUp(values);
                }}
              />
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SellerSignUpPage;
