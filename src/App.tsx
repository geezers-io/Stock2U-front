import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import AuthLayout from '@/components/layouts/Auth';
import ServiceLayout from '@/components/layouts/Service';
import { useGeoLocationAlert } from '@/hooks/useGeoLocationAlert';
import OAuthRedirectPage from '@/pages/auth/oauth-redirect/page';
import SignInPage from '@/pages/auth/sign-in/page';
import ChoiceRolePage from '@/pages/auth/sign-up/page';
import PurchaserSignUpPage from '@/pages/auth/sign-up/purchaser/page';
import SellerSignUpPage from '@/pages/auth/sign-up/seller/page';
import ProductMapPage from '@/pages/map/ProductMapPage';
import IndexPage from '@/pages/page';
import ProductDetailPage from '@/pages/products/[id]/page';
import ProductsSearchPage from '@/pages/products/page';
import ProductRegistrationPage from '@/pages/products/seller/page';
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
      {
        path: 'products',
        children: [
          {
            index: true,
            element: <ProductsSearchPage />,
          },
          {
            path: 'register',
            element: <ProductRegistrationPage />,
          },
          {
            path: ':id',
            element: <ProductDetailPage />,
          },
        ],
      },
      {
        path: 'chat',
        element: <div>chat page</div>,
      },
      {
        path: 'wishlist',
        element: <div>wishlist page</div>,
      },
      {
        path: 'my',
        element: <div>my page</div>,
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
            path: 'purchaser',
            element: <PurchaserSignUpPage />,
          },
          {
            path: 'seller',
            element: <SellerSignUpPage />,
          },
        ],
      },
      {
        path: 'oauth-redirect',
        element: <OAuthRedirectPage />,
      },
    ],
  },
  {
    path: 'map',
    index: true,
    element: <ProductMapPage />,
  },
]);

const App = () => {
  useGeoLocationAlert();

  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;
