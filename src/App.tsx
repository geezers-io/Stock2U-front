import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import AuthLayout from '@/components/layouts/Auth';
import ServiceLayout from '@/components/layouts/Service';
import CodeVerificationPage from '@/pages/auth/code-verification/page';
import GeneralJoinPage from '@/pages/auth/join/general/page';
import JoinPage from '@/pages/auth/join/page';
import SellerJoinPage from '@/pages/auth/join/seller/page';
import LoginPage from '@/pages/auth/login/page';
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
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'join',
        children: [
          {
            index: true,
            element: <JoinPage />,
          },
          {
            path: 'general',
            element: <GeneralJoinPage />,
          },
          {
            path: 'seller',
            element: <SellerJoinPage />,
          },
        ],
      },
      {
        path: 'code-verification',
        element: <CodeVerificationPage />,
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
