import { FC, useState } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import VerificationInput from '@/components/domains/auth/VerificationInput';
import { delay } from '@/utils/delay';

const CodeVerificationPage: FC = () => {
  const [verifying, setVerifying] = useState(false);

  const onComplete = async () => {
    setVerifying(true);

    await delay(1000);

    setVerifying(false);
  };

  return (
    <Box position="relative">
      <Box
        width="100%"
        position="absolute"
        top={0}
        transform={{
          base: 'translateY(calc(-100% - 24px))',
          md: 'translateY(calc(-100% - 32px))',
        }}
      >
        <Heading size="md" fontWeight="500" textAlign="center">
          인증코드를 입력해주세요.
        </Heading>
        <Text fontSize="sm" textAlign="center" color="gray.400">
          인증코드가 전송되지 않았다면 스팸함을 확인해보세요.
        </Text>
      </Box>

      <Flex justifyContent="center">
        <VerificationInput onComplete={onComplete} verifying={verifying} />
      </Flex>
    </Box>
  );
};

export default CodeVerificationPage;
