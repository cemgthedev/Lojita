import { StoreManagementPage } from "@/pages/Stores/StoreManagement";
import { StoreUpdatePage } from "@/pages/Stores/Update";
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
            element: <div>Dashboard</div>,
          },
          {
            path: `${urls.admin_dashboard}${urls.users}`,
            element: <div>Usuários</div>,
          },
          {
            path: `${urls.admin_dashboard}${urls.stores}`,
            element: <div>Lojas</div>,
          },
          {
            path: `${urls.admin_dashboard}${urls.stores}/:storeId`,
            element: <StoreManagementPage />,
          },
          {
            path: `${urls.admin_dashboard}${urls.stores}/:storeId${urls.update}`,
            element: <StoreUpdatePage />,
          },
          {
            path: `${urls.admin_dashboard}${urls.categories}`,
            element: <div>Categorias</div>,
          },
          {
            path: `${urls.admin_dashboard}${urls.variants}`,
            element: <div>Variantes</div>,
          },
          {
            path: `${urls.admin_dashboard}${urls.products}`,
            element: <div>Produtos</div>,
          },
          {
            path: `${urls.admin_dashboard}${urls.coupons}`,
            element: <div>Cupons</div>,
          },
          {
            path: `${urls.admin_dashboard}${urls.orders}`,
            element: <div>Pedidos</div>,
          },
          {
            path: `${urls.admin_dashboard}${urls.reviews}`,
            element: <div>Avaliações</div>,
          },
          {
            path: `${urls.admin_dashboard}${urls.attendances}`,
            element: <div>Atendimentos</div>,
          },
        ],
      },
    ],
  },
];
