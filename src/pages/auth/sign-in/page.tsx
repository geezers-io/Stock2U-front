import { FC, useEffect, useRef } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import { AuthVendor } from '@/api/@types/@enums';
import { AuthService } from '@/api/services/Auth';
import OAuthButton from '@/components/domains/auth/OAuthButton';
import { AUTH_VENDOR_LABEL } from '@/constants/labels';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useRedirect } from '@/hooks/useRedirect';
import useStompSocket from '@/hooks/useStompSocket';
import { useBoundedStore } from '@/stores';
import { pick } from '@/utils/object';

const popupDefaultSize: Record<AuthVendor, { width: number; height: number }> = {
  [AuthVendor.GOOGLE]: { width: 485, height: 710 },
  [AuthVendor.KAKAO]: { width: 480, height: 690 },
  [AuthVendor.NAVER]: { width: 480, height: 680 },
};

const SignInPage: FC = () => {
  const setUser = useBoundedStore(state => state.setUser);
  const { connect } = useStompSocket();
  const toast = useCustomToast();
  const popupWindow = useRef<Window | null>(null);
  const { redirect, navigateWithRedirectPath } = useRedirect();
  const currVendor = useRef<AuthVendor>();

  const tryLogin = async (authCode: string) => {
    try {
      const res = await AuthService.signIn({ authCode });

      if (!res.exists) {
        const searchParams = {
          ...pick(res, ['email', 'verification']),
          vendor: currVendor.current,
        };
        navigateWithRedirectPath('/auth/sign-up', undefined, searchParams);
        return;
      }

      setUser(res.user);
      connect(res.user);
      redirect();
    } catch (e) {
      toast.error(e);
    } finally {
      popupWindow.current?.close();
    }
  };

  const tryLoginDev = async (who: 'Patt' | 'Matt') => {
    try {
      const res = await AuthService.signInDev({ who });
      if (!res.exists) {
        return;
      }
      setUser(res.user);
      connect(res.user);
      redirect();
    } catch (e) {
      toast.error(e);
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

      currVendor.current = vendor;

      const { width, height } = popupDefaultSize[vendor];
      const { innerWidth, innerHeight } = window;

      openPopupWindow(url, `width=${Math.min(width, innerWidth)},height=${Math.min(height, innerHeight)}`);
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

      {/* 개발 목적 */}
      <OAuthButton vendor={AuthVendor.GOOGLE} label="Patt 로 로그인(구매자)" onClick={() => tryLoginDev('Patt')} />
      <OAuthButton vendor={AuthVendor.GOOGLE} label="Matt 로 로그인(판매자)" onClick={() => tryLoginDev('Matt')} />
    </Flex>
  );
};

export default SignInPage;
