import { FC } from 'react';
import { ChevronLeft } from 'react-bootstrap-icons';
import { Outlet } from 'react-router-dom';
import { IconButton } from '@chakra-ui/react';
import PageHeader from '@/components/layouts/parts/PageHeader';

const AuthLayout: FC = () => {
  return (
    <>
      <PageHeader>
        <IconButton aria-label="Back" variant="ghost" icon={<ChevronLeft fontSize={24} />} />
      </PageHeader>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
