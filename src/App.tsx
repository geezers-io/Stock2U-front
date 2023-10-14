import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import AuthLayout from '@/components/layouts/Auth';
import ServiceLayout from '@/components/layouts/Service';
import LoginPage from '@/pages/auth/login/page';
import IndexPage from '@/pages/page';
import ProductDetailPage from '@/pages/product/id/page';
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
    ],
  },
  {
    path: 'product',
    element: <AuthLayout />,
    children: [
      {
        path: ':id',
        element: <ProductDetailPage />,
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
