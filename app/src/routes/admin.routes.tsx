import { StoreManagementPage } from "@/pages/Stores/StoreManagement";
import { StoreUpdatePage } from "@/pages/Stores/Update";
import { AdminLayout } from "@/components/structures/layouts/AdminLayout";
import { urls } from "@/constants/urls";
import { CategoriesManagement } from "@/pages/Categories/CategoriesManagement";
import { CategoryCreatePage } from "@/pages/Categories/Create";
import { CategoryUpdatePage } from "@/pages/Categories/Update";
import { ProductsManagement } from "@/pages/Products/ProductsManagement";
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
            element: <CategoriesManagement />,
          },
          {
            path: `${urls.admin_dashboard}${urls.categories}${urls.create}`,
            element: <CategoryCreatePage />,
          },
          {
            path: `${urls.admin_dashboard}${urls.categories}/:categoryId${urls.update}`,
            element: <CategoryUpdatePage />,
          },
          {
            path: `${urls.admin_dashboard}${urls.variants}`,
            element: <div>Variantes</div>,
          },
          {
            path: `${urls.admin_dashboard}${urls.products}`,
            element: <ProductsManagement />,
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
