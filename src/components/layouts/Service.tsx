import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import PageAside from '@/components/layouts/parts/PageAside';
import PageHeader from '@/components/layouts/parts/PageHeader';

const ServiceLayout: FC = () => {
  return (
    <>
      <PageHeader>layout:Service pageHeader</PageHeader>
      <main>
        <Outlet />
      </main>
      <PageAside>layout:Service pageAside</PageAside>
    </>
  );
};

export default ServiceLayout;
