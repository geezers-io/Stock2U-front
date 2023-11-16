import { FC, PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserRole } from '@/api/@types/@enums';
import { useRedirect } from '@/hooks/useRedirect';
import { useBoundedStore } from '@/stores';

interface Props extends PropsWithChildren {
  role?: UserRole;
}

const RequireAuth: FC<Props> = ({ children, role }) => {
  const user = useBoundedStore(state => state.user);
  const { navigateWithRedirectPath } = useRedirect();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (!user) {
    navigateWithRedirectPath('/auth/sign-in', pathname);
    return;
  }
  if (role && user.role !== role) {
    navigate('/');
    return;
  }
  return children;
};

export default RequireAuth;
