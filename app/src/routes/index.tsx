import { createBrowserRouter } from "react-router";

import { NotFoundError } from "@/pages/Error/NotFoundError";
import { adminRoutes } from "./admin.routes";
import { customerRoutes } from "./customer.routes";
import { publicRoutes } from "./public.routes";
import { sellerRoutes } from "./seller.routes";
import { supportRoutes } from "./support.routes";

export const router = createBrowserRouter([
  ...publicRoutes,
  ...customerRoutes,
  ...sellerRoutes,
  ...supportRoutes,
  ...adminRoutes,
  {
    path: "*",
    Component: NotFoundError,
  },
]);
