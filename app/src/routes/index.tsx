import { createBrowserRouter, type RouteObject } from "react-router";

import { NotFoundError } from "@/pages/Error/NotFoundError";
import { RequireAuth } from "@/routes/guards/RequireAuth";
import { adminRoutes } from "./admin.routes";
import { customerRoutes } from "./customer.routes";
import { passwordRecoveryRoutes } from "./password-recovery.routes";
import { publicRoutes } from "./public.routes";
import { sellerRoutes } from "./seller.routes";
import { sharedRoutes } from "./shared.routes";
import { supportRoutes } from "./support.routes";

export const authenticatedRoutes: RouteObject = {
  element: <RequireAuth />,
  children: [
    ...sharedRoutes,
    ...customerRoutes,
    ...sellerRoutes,
    ...supportRoutes,
    ...adminRoutes,
  ],
};

export const router = createBrowserRouter([
  ...publicRoutes,
  ...passwordRecoveryRoutes,
  authenticatedRoutes,
  {
    path: "*",
    Component: NotFoundError,
  },
]);
