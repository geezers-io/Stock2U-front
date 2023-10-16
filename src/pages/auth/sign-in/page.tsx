import { FC, useEffect, useRef } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import { AuthVendor } from '@/api/@types/@enums';
import { AuthService } from '@/api/services/Auth';
import OAuthButton from '@/components/domains/auth/OAuthButton';
import { AUTH_VENDOR_LABEL } from '@/constants/labels';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useRedirect } from '@/hooks/useRedirect';

const SignInPage: FC = () => {
  const toast = useCustomToast();
  const popupWindow = useRef<Window | null>(null);
  const { redirect, navigateWithRedirectPath } = useRedirect();

  const tryLogin = async (authCode: string) => {
    try {
      const res = await AuthService.signIn({ authCode });

      if (res.exists) {
        redirect();
      } else {
        navigateWithRedirectPath('/auth/sign-up');
      }
    } catch (e) {
      toast.error(e);
    } finally {
      popupWindow.current?.close();
    }
  };

  const openPopupWindow = (url: string, size?: string) => {
    if (!popupWindow.current || popupWindow.current.closed) {
      popupWindow.current = window.open(url, 'popupWindow', size);
    } else {
      popupWindow.current.focus();
    }
  };

  const oauthHandler = async (vendor: AuthVendor) => {
    try {
      const { url } = await AuthService.signInURL({ vendor });

      openPopupWindow(url, 'width=500,height=600');
    } catch (e) {
      toast.error(e);
    }
  };

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const { authCode } = e.data;
      if (authCode) {
        tryLogin(authCode);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

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
