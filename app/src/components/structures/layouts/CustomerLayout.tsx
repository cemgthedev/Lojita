import { Outlet } from "react-router";

export type CustomerLayoutProps = {
  children: React.ReactNode;
};

export function CustomerLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Outlet />
    </div>
  );
}
