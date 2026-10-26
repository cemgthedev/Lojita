import { CustomerLayout } from "@/components/structures/layouts/CustomerLayout";
import { urls } from "@/constants/urls";
import { FavoritesPage } from "@/pages/Favorites";
import { CartPage } from "@/pages/Carts";
import { ChatDetailsPage } from "@/pages/Chats/ChatDetails";
import { ProductsPage } from "@/pages/Products/public";
import { ProductDetails } from "@/pages/Products/public/ProductDetails";
import { SupportTicketsPage } from "@/pages/SupportTickets/public";
import { SupportTicketCreatePage } from "@/pages/SupportTickets/Create";
import { SupportTicketUpdatePage } from "@/pages/SupportTickets/Update";
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
          {
            path: `${urls.customer_dashboard}${urls.cart}`,
            element: <CartPage />,
          },
          {
            path: `${urls.customer_dashboard}${urls.tickets}`,
            element: <SupportTicketsPage />,
          },
          {
            path: `${urls.customer_dashboard}${urls.tickets}${urls.create}`,
            element: <SupportTicketCreatePage />,
          },
          {
            path: `${urls.customer_dashboard}${urls.tickets}/:ticketId${urls.update}`,
            element: <SupportTicketUpdatePage />,
          },
          {
            path: `${urls.customer_dashboard}${urls.chats}/:chatId`,
            element: <ChatDetailsPage />,
          },
        ],
      },
    ],
  },
];
