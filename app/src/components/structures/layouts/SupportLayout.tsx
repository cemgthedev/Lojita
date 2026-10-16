import { SupportHeader } from "@/components/structures/headers/SupportLayout.tsx";
import { RoleSidebar } from "@/components/structures/layouts/RoleSidebar";
import { supportSidebarItems } from "@/components/structures/layouts/sidebar.config";
import { Outlet } from "react-router";

export type SupportLayoutProps = {
  children: React.ReactNode;
};

export function SupportLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SupportHeader />
      <div className="flex min-h-0 flex-1">
        <RoleSidebar label="Suporte" items={supportSidebarItems} />
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
