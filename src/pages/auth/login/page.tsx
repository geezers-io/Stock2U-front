import { FC, useMemo } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import { AuthVendor } from '@/api/@types/@enums';
import OAuthButton from '@/components/domains/auth/OAuthButton';
import { AUTH_VENDOR_LABEL } from '@/constants/labels';

const LoginPage: FC = () => {
  const oauthHandlers = useMemo<Record<AuthVendor, () => void>>(
    () => ({
      [AuthVendor.GOOGLE]: () => {
        // TODO: OAuth
      },

      [AuthVendor.KAKAO]: () => {
        // TODO: OAuth
      },

      [AuthVendor.NAVER]: () => {
        // TODO: OAuth
      },
    }),
    [],
  );

  return (
    <Flex position="relative" flexDirection="column" alignItems="center" gap="20px">
      <Box position="absolute" top={0} transform="translateY(calc(-100% - 32px))">
        <Image src="/svg/brand/logo-text.svg" width={160} />
      </Box>

      {Object.entries(AUTH_VENDOR_LABEL).map(([vendor, label]) => (
        <OAuthButton key={vendor} vendor={vendor as AuthVendor} label={label} onClick={oauthHandlers[vendor]} />
      ))}
    </Flex>
  );
};

export default LoginPage;
