import { AdminHeader } from "@/components/structures/headers/AdminHeader";
import { Outlet } from "react-router";

export type AdminLayoutProps = {
  children: React.ReactNode;
};

export function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <Outlet />
    </div>
  );
}
