import { Outlet } from "react-router";

export type SellerLayoutProps = {
  children: React.ReactNode;
};

export function SellerLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Outlet />
    </div>
  );
}
