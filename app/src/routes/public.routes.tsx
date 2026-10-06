import { PublicLayout } from "@/components/structures/layouts/PublicLayout";
import { urls } from "@/constants/urls";
import { LoginPage } from "@/pages/Login";
import { RegisterPage } from "@/pages/Register";
import type { RouteObject } from "react-router";

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: urls.home,
        element: <div />,
      },
      {
        path: urls.login,
        element: <LoginPage />,
      },
      {
        path: urls.register,
        element: <RegisterPage />,
      },
    ],
  },
];
