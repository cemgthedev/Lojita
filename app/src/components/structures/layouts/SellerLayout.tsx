import { SellerHeader } from "@/components/structures/headers/SellerHeader";
import { RoleSidebar } from "@/components/structures/layouts/RoleSidebar";
import { sellerSidebarItems } from "@/components/structures/layouts/sidebar.config";
import { Outlet } from "react-router";

export type SellerLayoutProps = {
  children: React.ReactNode;
};

export function SellerLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SellerHeader />
      <div className="flex min-h-0 flex-1">
        <RoleSidebar label="Minha loja" items={sellerSidebarItems} />
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
