import { createBrowserRouter } from "react-router";

import { NotFoundError } from "@/pages/Error/NotFoundError";
import { adminRoutes } from "./admin.routes";
import { customerRoutes } from "./customer.routes";
import { passwordRecoveryRoutes } from "./password-recovery.routes";
import { publicRoutes } from "./public.routes";
import { sellerRoutes } from "./seller.routes";
import { sharedRoutes } from "./shared.routes";
import { supportRoutes } from "./support.routes";

export const router = createBrowserRouter([
  ...publicRoutes,
  ...passwordRecoveryRoutes,
  ...sharedRoutes,
  ...customerRoutes,
  ...sellerRoutes,
  ...supportRoutes,
  ...adminRoutes,
  {
    path: "*",
    Component: NotFoundError,
  },
]);
