import { FC, useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { getErrorMessage } from '@/api/helper';
import { AuthService } from '@/api/services/Auth';
import VerificationInput from '@/components/domains/auth/VerificationInput';
import { useCustomToast } from '@/hooks/useCustomToast';

interface Props {
  isOpen: boolean;
  close: () => void;
  onSuccess: () => Promise<void>;
  phone: string;
}

const VerificationDrawer: FC<Props> = ({ isOpen, close, onSuccess, phone }) => {
  const toast = useCustomToast();
  const [error, setError] = useState<string>('에러입니다.');
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const sendingOrVerifying = sending || verifying;

  const clearError = () => {
    setError('');
  };

  const sendCode = async (successMsg: string = '인증 코드가 전송되었습니다.') => {
    try {
      clearError();
      setSending(true);

      await AuthService.sendCode({ phone });
      toast.info(successMsg);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setSending(false);
    }
  };

  const resendCode = async () => {
    await sendCode('인증 코드가 다시 전송되었습니다.');
  };

  const onComplete = async (code: string) => {
    try {
      setVerifying(true);

      await AuthService.verifyCode({ phone, authCode: code });
      await onSuccess();
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      sendCode();
    }
  }, [isOpen]);

  return (
    <Drawer isOpen={isOpen} onClose={close} placement="bottom">
      <DrawerOverlay />
      <DrawerContent h="100vh">
        <DrawerCloseButton size="lg" right="10px" color="gray.600" zIndex={1} />

        <DrawerBody transitionDuration="400ms">
          <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
            <Flex w="320px" maxW="100%" position="relative">
              <Box
                position="absolute"
                top={0}
                transform={{
                  base: 'translateY(calc(-100% - 16px))',
                  md: 'translateY(calc(-100% - 20px))',
                }}
              >
                <Heading size="md" fontWeight="500" textAlign="center">
                  문자로 전송된 인증코드를 입력해주세요.
                </Heading>
                <Text fontSize="sm" textAlign="center" color="gray.400" mt="6px">
                  인증코드가 전송되지 않았다면 스팸함을 확인해보세요.
                </Text>
              </Box>

              <Flex flexDirection="column" alignItems="center" gap="10px">
                <VerificationInput onComplete={onComplete} onChange={clearError} loading={sending || verifying} />
              </Flex>

              <Flex
                w="100%"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                bottom={0}
                transform={{
                  base: 'translateY(calc(100% + 6px))',
                  md: 'translateY(calc(100% + 8px))',
                }}
              >
                <Text size="sm" color="error.500" mt="10px">
                  {error}
                </Text>
                <Text
                  role="button"
                  tabIndex={0}
                  size="sm"
                  mt="10px"
                  color={verifying ? 'gray.400' : 'gray.800'}
                  cursor={verifying ? 'not-allowed' : 'pointer'}
                  textAlign="center"
                  textDecoration="underline"
                  textUnderlineOffset="2px"
                  onClick={sendingOrVerifying ? undefined : resendCode}
                >
                  {!sending && '인증번호 다시 보내기'}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default VerificationDrawer;
