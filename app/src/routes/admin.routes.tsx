import { AdminLayout } from "@/components/structures/layouts/AdminLayout";
import { adminSidebarItems } from "@/components/structures/layouts/sidebar.config";
import { RequireRole } from "@/routes/guards/RequireRole";
import type { RouteObject } from "react-router";

export const adminRoutes: RouteObject[] = [
  {
    element: <RequireRole allowedRoles={["admin"]} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          ...adminSidebarItems.flatMap(({ href, name }) =>
            href ? [{ path: href, element: <div>{name}</div> }] : [],
          ),
        ],
      },
    ],
  },
];
