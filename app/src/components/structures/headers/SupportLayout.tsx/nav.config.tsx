import { urls } from "@/constants/urls";
import type { NavItem } from "@/types/NavItem";
import { HouseIcon } from "lucide-react";

export const supportNavConfig: NavItem[] = [
  {
    name: "Início",
    icon: <HouseIcon size={24} />,
    href: urls.home,
  },
];
