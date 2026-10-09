import { urls } from "@/constants/urls";
import type { NavItem } from "@/types/NavItem";
import { HouseIcon, LayoutGridIcon } from "lucide-react";

export const publicNavConfig: NavItem[] = [
  {
    name: "Início",
    icon: <HouseIcon size={24} />,
    href: urls.home,
  },
  {
    name: "Categorias",
    icon: <LayoutGridIcon size={24} />,
    href: urls.categories,
  },
];
