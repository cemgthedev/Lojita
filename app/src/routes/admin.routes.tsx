import { AdminLayout } from "@/components/structures/layouts/AdminLayout";
import { urls } from "@/constants/urls";
import { AttributesManagementPage } from "@/pages/Attributes/AttributesManagement";
import { AttributeCreatePage } from "@/pages/Attributes/Create";
import { AttributeUpdatePage } from "@/pages/Attributes/Update";
import { CategoriesManagement } from "@/pages/Categories/CategoriesManagement";
import { CategoryCreatePage } from "@/pages/Categories/Create";
import { CategoryUpdatePage } from "@/pages/Categories/Update";
import { ProductsManagement } from "@/pages/Products/ProductsManagement";
import { StoreManagementPage } from "@/pages/Stores/StoreManagement";
import { StoreUpdatePage } from "@/pages/Stores/Update";
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
            path: `${urls.admin_dashboard}${urls.attributes}`,
            element: <AttributesManagementPage />,
          },
          {
            path: `${urls.admin_dashboard}${urls.attributes}${urls.create}`,
            element: <AttributeCreatePage />,
          },
          {
            path: `${urls.admin_dashboard}${urls.attributes}/:attributeId${urls.update}`,
            element: <AttributeUpdatePage />,
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
