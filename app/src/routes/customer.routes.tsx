import { CustomerLayout } from "@/components/structures/layouts/CustomerLayout";
import { urls } from "@/constants/urls";
import { RequireAuth } from "@/routes/guards/RequireAuth";
import { RequireRole } from "@/routes/guards/RequireRole";
import type { RouteObject } from "react-router";

export const customerRoutes: RouteObject[] = [
  {
    element: <RequireAuth />,
    children: [
      {
        element: <RequireRole allowedRoles={["customer"]} />,
        children: [
          {
            element: <CustomerLayout />,
            children: [
              {
                path: urls.customer_dashboard,
                element: <div>Customer Dashboard</div>,
              },
            ],
          },
        ],
      },
    ],
  },
];
