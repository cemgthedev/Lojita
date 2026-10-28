import { SellerLayout } from "@/components/structures/layouts/SellerLayout";
import { urls } from "@/constants/urls";
import { AttributesManagementPage } from "@/pages/Attributes/AttributesManagement";
import { SellerDashboard } from "@/pages/SellerDashboard";
import { AttributeCreatePage } from "@/pages/Attributes/Create";
import { AttributeUpdatePage } from "@/pages/Attributes/Update";
import { ChatDetailsPage } from "@/pages/Chats/ChatDetails";
import { ProductCreatePage } from "@/pages/Products/Create";
import { ProductsManagement } from "@/pages/Products/ProductsManagement";
import { ProductDetailsManagement } from "@/pages/Products/ProductsManagement/ProductDetailsManagement";
import { ProductUpdatePage } from "@/pages/Products/Update";
import { ProductsReviewsManagement } from "@/pages/ProductsReviews/ProductsReviewsManagement";
import { StoreDetailsManagementPage } from "@/pages/Stores/StoresManagement/StoreDetailsManagement";
import { StoreUpdatePage } from "@/pages/Stores/Update";
import { SupportTicketCreatePage } from "@/pages/SupportTickets/Create";
import { SupportTicketsManagementPage } from "@/pages/SupportTickets/SupportTicketsManagement";
import { SupportTicketUpdatePage } from "@/pages/SupportTickets/Update";
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
            element: <SellerDashboard />,
          },
          {
            path: `${urls.seller_dashboard}${urls.store}`,
            element: <StoreDetailsManagementPage />,
          },
          {
            path: `${urls.seller_dashboard}${urls.store}/:storeId`,
            element: <StoreDetailsManagementPage />,
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
          {
            path: `${urls.seller_dashboard}${urls.attendances}${urls.create}`,
            element: <SupportTicketCreatePage />,
          },
          {
            path: `${urls.seller_dashboard}${urls.attendances}/:ticketId${urls.update}`,
            element: <SupportTicketUpdatePage />,
          },
        ],
      },
    ],
  },
];
