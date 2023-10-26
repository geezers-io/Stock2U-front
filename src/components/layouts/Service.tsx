import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Button, Flex, Text } from '@chakra-ui/react';
import { AuthService } from '@/api/services/Auth';
import PageAside from '@/components/layouts/parts/PageAside';
import PageHeader from '@/components/layouts/parts/PageHeader';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useRedirect } from '@/hooks/useRedirect';
import { useBoundedStore } from '@/stores';

const ServiceLayout: FC = () => {
  const toast = useCustomToast();
  const [user, setUser] = useBoundedStore(state => [state.user, state.setUser]);
  const { navigateWithRedirectPath } = useRedirect();
  const location = useLocation();

  const handleClickLogin = async () => {
    navigateWithRedirectPath('/auth/sign-in', location.pathname);
  };

  const handleClickWithDraw = async () => {
    try {
      await AuthService.withdraw({ reason: '테스트 해야해서 제거' });
      setUser(undefined);
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <>
      <PageHeader>
        {!user && (
          <Flex w="100%" justifyContent="flex-end" alignItems="center">
            <Button size="sm" colorScheme="brand" onClick={handleClickLogin}>
              로그인
            </Button>
          </Flex>
        )}
        {user && (
          <Flex w="100%" justifyContent="space-between" alignItems="center">
            <Text>{user.name}님 환영합니다!</Text>
            <Button size="sm" colorScheme="red" onClick={handleClickWithDraw}>
              탈퇴하기(임시)
            </Button>
          </Flex>
        )}
      </PageHeader>

      <main>
        <Outlet />
      </main>

      <PageAside />
    </>
  );
};

export default ServiceLayout;
