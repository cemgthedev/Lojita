import { useAuth } from "@/providers/AuthProvider";
import type { Role } from "@/api/resources/users/validations/auth.schema";
import { Navigate, Outlet } from "react-router";

interface RequireRoleProps {
  allowedRoles: Role[];
}

export function RequireRole({ allowedRoles }: RequireRoleProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.some((role) => user.role.includes(role))) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
