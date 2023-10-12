import { Outlet } from 'react-router-dom';
import PageHeader from './parts/PageHeader';

const AuthLayout = () => {
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
