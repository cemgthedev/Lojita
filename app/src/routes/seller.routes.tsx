import { StoreManagementPage } from "@/pages/Stores/StoreManagement";
import { StoreUpdatePage } from "@/pages/Stores/Update";
import { SellerLayout } from "@/components/structures/layouts/SellerLayout";
import { urls } from "@/constants/urls";
import { RequireRole } from "@/routes/guards/RequireRole";
import type { RouteObject } from "react-router";

export const sellerRoutes: RouteObject[] = [
  {
    element: <RequireRole allowedRoles={["seller"]} />,
    children: [
      {
        element: <SellerLayout />,
        children: [
          {
            path: urls.seller_dashboard,
            element: <div>Dashboard</div>,
          },
          {
            path: `${urls.seller_dashboard}${urls.store}`,
            element: <StoreManagementPage />,
          },
          {
            path: `${urls.seller_dashboard}${urls.store}/:storeId`,
            element: <StoreManagementPage />,
          },
          {
            path: `${urls.seller_dashboard}${urls.store}/:storeId${urls.update}`,
            element: <StoreUpdatePage />,
          },
          {
            path: `${urls.seller_dashboard}${urls.products}`,
            element: <div>Produtos</div>,
          },
          {
            path: `${urls.seller_dashboard}${urls.coupons}`,
            element: <div>Cupons</div>,
          },
          {
            path: `${urls.seller_dashboard}${urls.orders}`,
            element: <div>Pedidos</div>,
          },
          {
            path: `${urls.seller_dashboard}${urls.reviews}`,
            element: <div>Avaliações</div>,
          },
          {
            path: `${urls.seller_dashboard}${urls.chats}`,
            element: <div>Chats</div>,
          },
        ],
      },
    ],
  },
];
