import { Outlet } from 'react-router-dom';
import SideNav from '../../components/SideNav';

export default function UserLayout() {
  return (
    <div>
      <SideNav />
      <Outlet />
    </div>
  );
}
