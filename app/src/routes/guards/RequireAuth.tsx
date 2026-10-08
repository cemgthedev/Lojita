import { useAuth } from "@/providers/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router";

export function RequireAuth() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
}
