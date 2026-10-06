import { Outlet } from "react-router";

export type SupportLayoutProps = {
  children: React.ReactNode;
};

export function SupportLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Outlet />
    </div>
  );
}
