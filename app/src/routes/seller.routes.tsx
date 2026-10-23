import { SellerLayout } from "@/components/structures/layouts/SellerLayout";
import { urls } from "@/constants/urls";
import { AttributesManagementPage } from "@/pages/Attributes/AttributesManagement";
import { ChatDetailsPage } from "@/pages/Chats/ChatDetails";
import { AttributeCreatePage } from "@/pages/Attributes/Create";
import { AttributeUpdatePage } from "@/pages/Attributes/Update";
import { ProductsManagement } from "@/pages/Products/ProductsManagement";
import { ProductDetailsManagement } from "@/pages/Products/ProductsManagement/ProductDetailsManagement";
import { ProductCreatePage } from "@/pages/Products/Create";
import { ProductUpdatePage } from "@/pages/Products/Update";
import { StoreManagementPage } from "@/pages/Stores/StoreManagement";
import { StoreUpdatePage } from "@/pages/Stores/Update";
import { ProductsReviewsManagement } from "@/pages/ProductsReviews/ProductsReviewsManagement";
import { SupportTicketsManagementPage } from "@/pages/SupportTickets/SupportTicketsManagement";
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
            element: <ProductsManagement />,
          },
          {
            path: `${urls.seller_dashboard}${urls.products}/:productId`,
            element: <ProductDetailsManagement />,
          },
          {
            path: `${urls.seller_dashboard}${urls.products}${urls.create}`,
            element: <ProductCreatePage />,
          },
          {
            path: `${urls.seller_dashboard}${urls.products}/:productId${urls.update}`,
            element: <ProductUpdatePage />,
          },
          {
            path: `${urls.seller_dashboard}${urls.attributes}`,
            element: <AttributesManagementPage />,
          },
          {
            path: `${urls.seller_dashboard}${urls.attributes}${urls.create}`,
            element: <AttributeCreatePage />,
          },
          {
            path: `${urls.seller_dashboard}${urls.attributes}/:attributeId${urls.update}`,
            element: <AttributeUpdatePage />,
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
            element: <ProductsReviewsManagement />,
          },
          {
            path: `${urls.seller_dashboard}${urls.chats}`,
            element: <div>Chats</div>,
          },
          {
            path: `${urls.seller_dashboard}${urls.chats}/:chatId`,
            element: <ChatDetailsPage />,
          },
          {
            path: `${urls.seller_dashboard}${urls.attendances}`,
            element: <SupportTicketsManagementPage />,
          },
        ],
      },
    ],
  },
];
