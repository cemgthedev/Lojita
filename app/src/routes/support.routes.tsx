import { SupportLayout } from "@/components/structures/layouts/SupportLayout";
import { supportSidebarItems } from "@/components/structures/layouts/sidebar.config";
import { RequireRole } from "@/routes/guards/RequireRole";
import type { RouteObject } from "react-router";

export const supportRoutes: RouteObject[] = [
  {
    element: <RequireRole allowedRoles={["support"]} />,
    children: [
      {
        element: <SupportLayout />,
        children: [
          ...supportSidebarItems.flatMap(({ href, name }) =>
            href ? [{ path: href, element: <div>{name}</div> }] : [],
          ),
        ],
      },
    ],
  },
];
