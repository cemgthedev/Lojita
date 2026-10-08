import { AdminLayout } from "@/components/structures/layouts/AdminLayout";
import { urls } from "@/constants/urls";
import { RequireRole } from "@/routes/guards/RequireRole";
import type { RouteObject } from "react-router";

export const adminRoutes: RouteObject[] = [
  {
    element: <RequireRole allowedRoles={["admin"]} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: urls.admin_dashboard,
            element: <div>Admin Dashboard</div>,
          },
        ],
      },
    ],
  },
];
