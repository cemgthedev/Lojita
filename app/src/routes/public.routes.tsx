import { PublicLayout } from "@/components/structures/layouts/PublicLayout";
import { LoginPage } from "@/pages/Login";
import { RegisterPage } from "@/pages/Register";
import type { RouteObject } from "react-router";

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <div />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
];
