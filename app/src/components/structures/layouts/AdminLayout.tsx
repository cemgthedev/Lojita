import { AdminHeader } from "@/components/structures/headers/AdminHeader";
import { RoleSidebar } from "@/components/structures/layouts/RoleSidebar";
import { adminSidebarItems } from "@/components/structures/layouts/sidebar.config";
import { Outlet } from "react-router";

export type AdminLayoutProps = {
  children: React.ReactNode;
};

export function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="flex min-h-0 flex-1">
        <RoleSidebar label="Administração" items={adminSidebarItems} />
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
