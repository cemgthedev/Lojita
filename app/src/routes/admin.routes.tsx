import { AdminLayout } from "@/components/structures/layouts/AdminLayout";
import { RequireAuth } from "@/routes/guards/RequireAuth";
import { RequireRole } from "@/routes/guards/RequireRole";
import type { RouteObject } from "react-router";

export const adminRoutes: RouteObject[] = [
  {
    element: <RequireAuth />,
    children: [
      {
        element: <RequireRole allowedRoles={["admin"]} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: "/admin-dashboard",
                element: <div>Admin Dashboard</div>,
              },
            ],
          },
        ],
      },
    ],
  },
];
