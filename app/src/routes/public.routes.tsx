import { PublicLayout } from "@/components/structures/layouts/PublicLayout";
import { urls } from "@/constants/urls";
import { ListCategoriesPage } from "@/pages/Categories/public/ListCategoriesPage";
import { LoginPage } from "@/pages/Login";
import { ProductsPage } from "@/pages/Products/public";
import { ProductDetails } from "@/pages/Products/public/ProductDetails";
import { PublicDashboard } from "@/pages/PublicDashboard";
import { RegisterPage } from "@/pages/Register";
import { StoreDetailsPage } from "@/pages/Stores/public/StoreDetails";
import type { RouteObject } from "react-router";

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: urls.home,
        element: <PublicDashboard />,
      },
      {
        path: urls.login,
        element: <LoginPage />,
      },
      {
        path: urls.register,
        element: <RegisterPage />,
      },
      {
        path: urls.categories,
        element: <ListCategoriesPage />,
      },
      {
        path: `${urls.stores}/:id`,
        element: <StoreDetailsPage />,
      },
      {
        path: `${urls.products}`,
        element: <ProductsPage />,
      },
      {
        path: `${urls.products}/:productId`,
        element: <ProductDetails />,
      },
    ],
  },
];
