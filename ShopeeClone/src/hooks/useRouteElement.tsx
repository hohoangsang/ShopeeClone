import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import AuthLayout from 'src/layouts/AuthLayout';
import MainLayout from 'src/layouts/MainLayout';
import Login from 'src/pages/Login';
import ProductList from 'src/pages/ProductList';
import Profile from 'src/pages/Profile';
import Register from 'src/pages/Register';

const isAuthentication = false;

function ProtectedRoute() {
  return isAuthentication ? <Outlet /> : <Navigate to={'/login'} />; //chưa dăng nhập thì đá ra màn hình login, đã đăng nhập thì tiếp tục render route con
}

function RejectedRoute() {
  return !isAuthentication ? <Outlet /> : <Navigate to={'/'} />; //đã dăng nhập thì đá ra màn hình chính, chưa đăng nhập thì tiếp tục render route con
}

export default function useRouteElement() {
  const elementRoute = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '/login',
      element: (
        <AuthLayout>
          <Login />
        </AuthLayout>
      )
    },
    {
      path: '/register',
      element: (
        <AuthLayout>
          <Register />
        </AuthLayout>
      )
    }
  ]);

  return elementRoute;
}
