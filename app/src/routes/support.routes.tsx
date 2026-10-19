import { SupportLayout } from "@/components/structures/layouts/SupportLayout";
import { urls } from "@/constants/urls";
import { AttributesManagementPage } from "@/pages/Attributes/AttributesManagement";
import { CategoriesManagement } from "@/pages/Categories/CategoriesManagement";
import { CategoryCreatePage } from "@/pages/Categories/Create";
import { CategoryUpdatePage } from "@/pages/Categories/Update";
import { ProductsManagement } from "@/pages/Products/ProductsManagement";
import { RequireRole } from "@/routes/guards/RequireRole";
import type { RouteObject } from "react-router";

export const supportRoutes: RouteObject[] = [
  {
    element: <RequireRole allowedRoles={["support"]} />,
    children: [
      {
        element: <SupportLayout />,
        children: [
          {
            path: urls.support_dashboard,
            element: <div>Dashboard</div>,
          },
          {
            path: `${urls.support_dashboard}${urls.users}`,
            element: <div>Usuários</div>,
          },
          {
            path: `${urls.support_dashboard}${urls.stores}`,
            element: <div>Lojas</div>,
          },
          {
            path: `${urls.support_dashboard}${urls.categories}`,
            element: <CategoriesManagement />,
          },
          {
            path: `${urls.support_dashboard}${urls.attributes}`,
            element: <AttributesManagementPage />,
          },
          {
            path: `${urls.support_dashboard}${urls.categories}${urls.create}`,
            element: <CategoryCreatePage />,
          },
          {
            path: `${urls.support_dashboard}${urls.categories}/:categoryId${urls.update}`,
            element: <CategoryUpdatePage />,
          },
          {
            path: `${urls.support_dashboard}${urls.variants}`,
            element: <div>Variantes</div>,
          },
          {
            path: `${urls.support_dashboard}${urls.products}`,
            element: <ProductsManagement />,
          },
          {
            path: `${urls.support_dashboard}${urls.coupons}`,
            element: <div>Cupons</div>,
          },
          {
            path: `${urls.support_dashboard}${urls.orders}`,
            element: <div>Pedidos</div>,
          },
          {
            path: `${urls.support_dashboard}${urls.reviews}`,
            element: <div>Avaliações</div>,
          },
          {
            path: `${urls.support_dashboard}${urls.attendances}`,
            element: <div>Atendimentos</div>,
          },
        ],
      },
    ],
  },
];
