import { SellerLayout } from "@/components/structures/layouts/SellerLayout";
import { sellerSidebarItems } from "@/components/structures/layouts/sidebar.config";
import { RequireRole } from "@/routes/guards/RequireRole";
import type { RouteObject } from "react-router";

export const sellerRoutes: RouteObject[] = [
  {
    element: <RequireRole allowedRoles={["seller"]} />,
    children: [
      {
        element: <SellerLayout />,
        children: [
          ...sellerSidebarItems.flatMap(({ href, name }) =>
            href ? [{ path: href, element: <div>{name}</div> }] : [],
          ),
        ],
      },
    ],
  },
];
