import { urls } from "@/constants/urls";
import type { NavItem } from "@/shared/types/NavItem";
import { HouseIcon } from "lucide-react";

export const adminNavConfig: NavItem[] = [
  {
    name: "Início",
    icon: <HouseIcon size={24} />,
    href: urls.home,
  },
];
