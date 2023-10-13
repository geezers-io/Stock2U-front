import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import PageHeader from '@/components/layouts/parts/PageHeader';

const AuthLayout: FC = () => {
  return (
    <>
      <PageHeader>layout:Auth</PageHeader>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
