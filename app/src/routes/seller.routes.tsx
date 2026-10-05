import { SellerLayout } from "@/components/structures/layouts/SellerLayout";
import { RequireAuth } from "@/routes/guards/RequireAuth";
import { RequireRole } from "@/routes/guards/RequireRole";
import type { RouteObject } from "react-router";

export const sellerRoutes: RouteObject[] = [
  {
    element: <RequireAuth />,
    children: [
      {
        element: <RequireRole allowedRoles={["seller"]} />,
        children: [
          {
            element: <SellerLayout />,
            children: [
              {
                path: "/seller-dashboard",
                element: <div>Seller Dashboard</div>,
              },
            ],
          },
        ],
      },
    ],
  },
];
