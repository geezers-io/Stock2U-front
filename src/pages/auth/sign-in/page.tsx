import { FC, useEffect } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import { AuthVendor } from '@/api/@types/@enums';
import { AuthService } from '@/api/services/Auth';
import OAuthButton from '@/components/domains/auth/OAuthButton';
import { AUTH_VENDOR_LABEL } from '@/constants/labels';
import { useCustomToast } from '@/hooks/useCustomToast';

const SignInPage: FC = () => {
  // const [searchParams] = useSearchParams();
  const toast = useCustomToast();

  const oauthHandler = async (vendor: AuthVendor) => {
    try {
      const { url } = await AuthService.signInURL({ vendor });

      // const redirect = searchParams.get('redirect');

      location.href = url;
    } catch (e) {
      toast.error(e);
    }
  };

  useEffect(() => {}, []);

  return (
    <Flex position="relative" flexDirection="column" alignItems="center" gap="20px">
      <Box position="absolute" top={0} transform="translateY(calc(-100% - 32px))">
        <Image src="/svg/brand/logo-text.svg" width={160} />
      </Box>

      {Object.entries(AUTH_VENDOR_LABEL).map(([vendor_, label]) => {
        const vendor = vendor_ as AuthVendor;
        return <OAuthButton key={vendor} vendor={vendor} label={label} onClick={() => oauthHandler(vendor)} />;
      })}
    </Flex>
  );
};
export default SignInPage;
