import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';
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
  const { pathname } = useLocation();

  const handleClickLogin = async () => {
    navigateWithRedirectPath('/auth/sign-in', pathname);
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
        <Flex w="100%" justifyContent="space-between" alignItems="center">
          {user && <Text>{user.name}님 환영합니다!</Text>}
          {!user && <div />}

          {/* TODO: 현재 align 안맞음 - 김준재가 추후 수정 */}
          <Heading fontSize="xl" fontWeight={500}>
            {pathname.includes('products/seller') && '재고 등록'}
          </Heading>

          {user && (
            <Button size="md" colorScheme="red" onClick={handleClickWithDraw}>
              탈퇴하기(임시)
            </Button>
          )}
          {!user && (
            <Button size="md" colorScheme="brand" onClick={handleClickLogin}>
              로그인
            </Button>
          )}
        </Flex>
      </PageHeader>

      <main className="with-aside">
        <Outlet />
      </main>

      <PageAside />
    </>
  );
};

export default ServiceLayout;
