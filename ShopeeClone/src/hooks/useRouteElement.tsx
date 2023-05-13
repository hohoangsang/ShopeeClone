import { useRoutes } from 'react-router-dom';
import AuthLayout from 'src/layouts/AuthLayout';
import MainLayout from 'src/layouts/MainLayout';
import Login from 'src/pages/Login';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';

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
