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

interface Props {
  isOpen: boolean;
  close: () => void;
  onSuccess: () => Promise<void>;
  phone: string;
}

const VerificationDrawer: FC<Props> = ({ isOpen, close, onSuccess, phone }) => {
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string>('에러입니다.');

  const clearError = () => {
    setError('');
  };

  const sendCode = async () => {
    try {
      clearError();
      setSending(true);

      await AuthService.sendCode({ phone });
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setSending(false);
    }
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
            <Flex h="max-content" position="relative">
              <Box
                position="absolute"
                top={0}
                transform={{
                  base: 'translateY(calc(-100% - 16px))',
                  md: 'translateY(calc(-100% - 20px))',
                }}
              >
                <Heading size="md" fontWeight="500" textAlign="center">
                  인증코드를 입력해주세요.
                </Heading>
                <Text fontSize="sm" textAlign="center" color="gray.400">
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
                  color={sending || verifying ? 'gray.400' : 'gray.800'}
                  cursor={sending || verifying ? 'not-allowed' : 'pointer'}
                  textAlign="center"
                  textDecoration="underline"
                  textUnderlineOffset="2px"
                  onClick={sending || verifying ? undefined : sendCode}
                >
                  {!sending && <>인증번호 다시 보내기</>}
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
