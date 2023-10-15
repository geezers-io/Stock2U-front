import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthService } from '@/api/services/Auth';
import { useCustomToast } from '@/hooks/useCustomToast';

const OAuthRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useCustomToast();

  useEffect(() => {
    (async () => {
      const authCode = searchParams.get('code');
      // const redirect = searchParams.get('redirect') || '/';
      const redirect = searchParams.get('redirect') || '/auth/sign-in';

      if (!authCode) {
        navigate(redirect);
        return;
      }

      try {
        const res = await AuthService.signIn({ authCode });

        if (res.exists) {
          navigate(redirect);
        } else {
          navigate('/auth/sign-up');
        }
      } catch (e) {
        toast.error(e);
        navigate(redirect);
      }
    })();
  }, []);

  return null;
};

export default OAuthRedirectPage;
