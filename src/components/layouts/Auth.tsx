import { FC } from 'react';
import { ChevronLeft } from 'react-bootstrap-icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Flex, Heading, IconButton } from '@chakra-ui/react';
import PageHeader from '@/components/layouts/parts/PageHeader';

const AuthLayout: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <PageHeader>
        <Flex w="100%" position="relative" justifyContent="center" alignItems="center">
          <IconButton
            aria-label="Back"
            position="absolute"
            left={0}
            variant="ghost"
            icon={<ChevronLeft fontSize={24} />}
            onClick={() => navigate(-1)}
          />

          <Heading fontSize="xl" fontWeight={500}>
            {pathname.includes('sign-in') && '로그인'}
            {pathname.includes('sign-up') && '회원가입'}
          </Heading>
        </Flex>
      </PageHeader>

      <main>
        <Flex minHeight="inherit" flexDirection="column" justifyContent="center">
          <Outlet />
        </Flex>
      </main>
    </>
  );
};

export default AuthLayout;
