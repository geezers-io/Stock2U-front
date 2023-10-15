import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import AuthLayout from '@/components/layouts/Auth';
import ServiceLayout from '@/components/layouts/Service';
import CodeVerificationPage from '@/pages/auth/code-verification/page';
import OAuthRedirectPage from '@/pages/auth/oauth-redirect/page';
import SignInPage from '@/pages/auth/sign-in/page';
import GeneralSignUpPage from '@/pages/auth/sign-up/general/page';
import ChoiceRolePage from '@/pages/auth/sign-up/page';
import SellerSignUpPage from '@/pages/auth/sign-up/seller/page';
import IndexPage from '@/pages/page';
import theme from '@/styles/theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ServiceLayout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-in',
        element: <SignInPage />,
      },
      {
        path: 'sign-up',
        children: [
          {
            index: true,
            element: <ChoiceRolePage />,
          },
          {
            path: 'general',
            element: <GeneralSignUpPage />,
          },
          {
            path: 'seller',
            element: <SellerSignUpPage />,
          },
        ],
      },
      {
        path: 'code-verification',
        element: <CodeVerificationPage />,
      },
      {
        path: 'oauth-redirect',
        element: <OAuthRedirectPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;
