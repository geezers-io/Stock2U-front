import { FC, useLayoutEffect, useState } from 'react';
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { AuthVendor } from '@/api/@types/@enums';
import { PurchaserSignUpRequest } from '@/api/@types/Auth';
import { AuthService } from '@/api/services/Auth';
import VerificationDrawer from '@/components/domains/auth/VerificationDrawer';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useRedirect } from '@/hooks/useRedirect';
import { useSearchParamsObject } from '@/hooks/useSearchParamsObject';
import { useBoundedStore } from '@/stores';
import { generateValidators } from '@/utils/formik';

const { validators, getFormikStates } = generateValidators<PurchaserSignUpRequest>({
  username: { required: true, range: { min: 3, max: 15 }, regex: 'nickname' },
  email: { required: true, regex: 'email' },
  phone: { required: true, regex: /^[0-9]{11}/ },
  verification: { required: true },
  vendor: { required: true },
});

const PurchaserSignUpPage: FC = () => {
  const { redirect } = useRedirect();
  const toast = useCustomToast();
  const [verificationDrawerOpen, setVerificationDrawerOpen] = useState(false);
  const [{ email, verification, vendor }] = useSearchParamsObject();
  const setUser = useBoundedStore(state => state.setUser);

  const openVerificationDrawer = () => {
    setVerificationDrawerOpen(true);
  };
  const closeVerificationDrawer = () => {
    setVerificationDrawerOpen(false);
  };

  const signUp = async (values: PurchaserSignUpRequest) => {
    try {
      const user = await AuthService.signUpPurchaser(values);
      setUser(user);
      redirect();
    } catch (e) {
      toast.error(e);
    }
  };

  useLayoutEffect(() => {
    if (!verification || !vendor) {
      redirect();
    }
  }, [verification, vendor]);

  if (!verification || !vendor) {
    return null;
  }
  return (
    <Formik<PurchaserSignUpRequest>
      initialValues={{
        email: email ?? '',
        phone: '',
        username: '',
        verification, // From searchParams
        vendor: vendor as AuthVendor, // From searchParams
      }}
      onSubmit={openVerificationDrawer}
    >
      {props => {
        const { showErrorDict, canSubmit, errors, values } = getFormikStates(props);

        return (
          <Form>
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

              <Button type="submit" size="lg" colorScheme="brand" isDisabled={!canSubmit} mt={4}>
                가입하기
              </Button>

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

export default PurchaserSignUpPage;
