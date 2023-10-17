import { useEffect } from 'react';
import { useSearchParamsObject } from '@/hooks/useSearchParamsObject';

const OAuthRedirectPage = () => {
  const [{ code }] = useSearchParamsObject();

  useEffect(() => {
    window.opener.postMessage({ authCode: code });
  }, []);

  return null;
};

export default OAuthRedirectPage;
