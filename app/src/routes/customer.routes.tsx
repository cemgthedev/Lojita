import { CustomerLayout } from "@/components/structures/layouts/CustomerLayout";
import { urls } from "@/constants/urls";
import { FavoritesPage } from "@/pages/Favorites";
import { ProductsPage } from "@/pages/Products/public";
import { ProductDetails } from "@/pages/Products/public/ProductDetails";
import { RequireRole } from "@/routes/guards/RequireRole";
import type { RouteObject } from "react-router";

export const customerRoutes: RouteObject[] = [
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
          {
            path: `${urls.customer_dashboard}${urls.products}`,
            element: <ProductsPage />,
          },
          {
            path: `${urls.customer_dashboard}${urls.products}/:productId`,
            element: <ProductDetails />,
          },
          {
            path: `${urls.customer_dashboard}${urls.favorites}`,
            element: <FavoritesPage />,
          },
        ],
      },
    ],
  },
];
