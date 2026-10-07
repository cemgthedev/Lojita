import { PublicHeader } from "@/components/structures/headers/PublicHeader";
import { Outlet } from "react-router";

export type PublicLayoutProps = {
  children: React.ReactNode;
};

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <Outlet />
    </div>
  );
}
