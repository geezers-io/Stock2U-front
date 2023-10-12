import { Outlet } from 'react-router-dom';
import PageAside from './parts/PageAside';
import PageHeader from './parts/PageHeader';

const ServiceLayout = () => {
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
