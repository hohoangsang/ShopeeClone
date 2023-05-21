import { useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { AppContext } from 'src/contexts/app.context';
import AuthLayout from 'src/layouts/AuthLayout';
import MainLayout from 'src/layouts/MainLayout';
import Login from 'src/pages/Login';
import ProductList from 'src/pages/ProductList';
import Profile from 'src/pages/Profile';
import Register from 'src/pages/Register';

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
      path: '',
      element: <RejectedRoute />,
      children: [
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
      ]
    },
    {
      path: '/',
      index: true, //Phân biệt đây là route chính để không bị trùng lặp với các kiểu path là ''
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    }
  ]);

  return elementRoute;
}
