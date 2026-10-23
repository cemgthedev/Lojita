import { SupportLayout } from "@/components/structures/layouts/SupportLayout";
import { urls } from "@/constants/urls";
import { AttributesManagementPage } from "@/pages/Attributes/AttributesManagement";
import { AttributeCreatePage } from "@/pages/Attributes/Create";
import { AttributeUpdatePage } from "@/pages/Attributes/Update";
import { CategoriesManagement } from "@/pages/Categories/CategoriesManagement";
import { ChatDetailsPage } from "@/pages/Chats/ChatDetails";
import { CategoryCreatePage } from "@/pages/Categories/Create";
import { CategoryUpdatePage } from "@/pages/Categories/Update";
import { ProductsManagement } from "@/pages/Products/ProductsManagement";
import { ProductDetailsManagement } from "@/pages/Products/ProductsManagement/ProductDetailsManagement";
import { ProductUpdatePage } from "@/pages/Products/Update";
import { ProductsReviewsManagement } from "@/pages/ProductsReviews/ProductsReviewsManagement";
import { SupportTicketsManagementPage } from "@/pages/SupportTickets/SupportTicketsManagement";
import { UserCreatePage } from "@/pages/Users/Create";
import { UserUpdatePage } from "@/pages/Users/Update";
import { UsersManagementPage } from "@/pages/Users/UsersManagement";
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
            element: <UsersManagementPage />,
          },
          {
            path: `${urls.support_dashboard}${urls.users}${urls.create}`,
            element: <UserCreatePage />,
          },
          {
            path: `${urls.support_dashboard}${urls.users}/:userId${urls.update}`,
            element: <UserUpdatePage />,
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
            path: `${urls.support_dashboard}${urls.attributes}${urls.create}`,
            element: <AttributeCreatePage />,
          },
          {
            path: `${urls.support_dashboard}${urls.attributes}/:attributeId${urls.update}`,
            element: <AttributeUpdatePage />,
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
            path: `${urls.support_dashboard}${urls.products}/:productId`,
            element: <ProductDetailsManagement />,
          },
          {
            path: `${urls.support_dashboard}${urls.products}/:productId${urls.update}`,
            element: <ProductUpdatePage />,
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
            element: <ProductsReviewsManagement />,
          },
          {
            path: `${urls.support_dashboard}${urls.attendances}`,
            element: <SupportTicketsManagementPage />,
          },
          {
            path: `${urls.support_dashboard}${urls.chats}/:chatId`,
            element: <ChatDetailsPage />,
          },
        ],
      },
    ],
  },
];
