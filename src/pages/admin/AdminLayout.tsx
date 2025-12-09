import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <AdminSidebar />
      <Outlet />
    </div>
  );
}
