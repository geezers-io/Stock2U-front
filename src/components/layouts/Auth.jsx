import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div>
      layout:Auth
      <Outlet />
    </div>
  );
};

export default AuthLayout;
