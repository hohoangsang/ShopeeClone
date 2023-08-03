import { useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { path } from 'src/constants/path';
import { AppContext } from 'src/contexts/app.context';
import AuthLayout from 'src/layouts/AuthLayout';
import CartLayout from 'src/layouts/CartLayout';
import MainLayout from 'src/layouts/MainLayout';
import Cart from 'src/pages/Cart';
import Login from 'src/pages/Login';
import ProductDetail from 'src/pages/ProductDetail';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import UserLayout from 'src/pages/User/layout/UserLayout';
import ChangePassword from 'src/pages/User/pages/ChangePassword';
import Profile from 'src/pages/User/pages/Profile';
import PurchaseHistory from 'src/pages/User/pages/PurchaseHistory';

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />; //chưa dăng nhập thì đá ra màn hình login, đã đăng nhập thì tiếp tục render route con
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />; //đã dăng nhập thì đá ra màn hình chính, chưa đăng nhập thì tiếp tục render route con
}

export default function useRouteElement() {
  const elementRoute = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.password,
              element: <ChangePassword />
            },
            {
              path: path.purchaseHistory,
              element: <PurchaseHistory />
            }
          ]
        },

        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <AuthLayout>
              <Login />
            </AuthLayout>
          )
        },
        {
          path: path.register,
          element: (
            <AuthLayout>
              <Register />
            </AuthLayout>
          )
        }
      ]
    },
    {
      path: path.home,
      index: true, //Phân biệt đây là route chính để không bị trùng lặp với các kiểu path là ''
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    }
  ]);

  return elementRoute;
}
