import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const OAuthRedirectPage = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const authCode = searchParams.get('code');

    window.opener.postMessage({ authCode });
  }, []);

  return null;
};

export default OAuthRedirectPage;
