import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { UserRole } from '@/api/@types/@enums';
import AuthLayout from '@/components/layouts/Auth';
import ServiceLayout from '@/components/layouts/Service';
import RequireAuth from '@/components/shared/RequireAuth';
import { useGeoAlert } from '@/hooks/useGeoAlert';
import OAuthRedirectPage from '@/pages/auth/oauth-redirect/page';
import SignInPage from '@/pages/auth/sign-in/page';
import ChoiceRolePage from '@/pages/auth/sign-up/page';
import PurchaserSignUpPage from '@/pages/auth/sign-up/purchaser/page';
import SellerSignUpPage from '@/pages/auth/sign-up/seller/page';
import ChatPage from '@/pages/chat/[id]/page';
import ChatListPage from '@/pages/chat/page';
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
            element: (
              <RequireAuth role={UserRole.SELLER}>
                <ProductRegistrationPage />
              </RequireAuth>
            ),
          },
          {
            path: ':id',
            element: <ProductDetailPage />,
          },
        ],
      },
      {
        path: 'chat',
        children: [
          {
            index: true,
            element: (
              <RequireAuth>
                <ChatListPage />
              </RequireAuth>
            ),
          },
          {
            path: ':id',
            element: (
              <RequireAuth>
                <ChatPage />
              </RequireAuth>
            ),
          },
        ],
      },
      {
        path: 'wishlist',
        element: (
          <RequireAuth>
            <div>wishlist page</div>
          </RequireAuth>
        ),
      },
      {
        path: 'my',
        element: (
          <RequireAuth>
            <div>my page</div>
          </RequireAuth>
        ),
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
]);

const App = () => {
  useGeoAlert();

  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;
