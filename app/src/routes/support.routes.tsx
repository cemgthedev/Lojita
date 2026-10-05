import { SupportLayout } from "@/components/structures/layouts/SupportLayout";
import { RequireAuth } from "@/routes/guards/RequireAuth";
import { RequireRole } from "@/routes/guards/RequireRole";
import type { RouteObject } from "react-router";

export const supportRoutes: RouteObject[] = [
  {
    element: <RequireAuth />,
    children: [
      {
        element: <RequireRole allowedRoles={["support"]} />,
        children: [
          {
            element: <SupportLayout />,
            children: [
              {
                path: "/support-dashboard",
                element: <div>Support Dashboard</div>,
              },
            ],
          },
        ],
      },
    ],
  },
];
