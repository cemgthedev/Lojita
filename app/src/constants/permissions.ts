import { ROLE, type Role } from "@/types/Auth";
import { PERMISSION, type Permission } from "@/types/Permission";

export const permissions: Record<Role, readonly Permission[]> = {
  [ROLE.CUSTOMER]: [
    PERMISSION.PRODUCTS_READ,
    PERMISSION.PRODUCTS_CREATE,
    PERMISSION.PRODUCTS_UPDATE,
  ],

  [ROLE.SELLER]: [
    PERMISSION.PRODUCTS_READ,
    PERMISSION.PRODUCTS_CREATE,
    PERMISSION.PRODUCTS_UPDATE,
  ],

  [ROLE.SUPPORT]: [PERMISSION.PRODUCTS_READ, PERMISSION.PRODUCTS_UPDATE],

  [ROLE.ADMIN]: [PERMISSION.PRODUCTS_READ, PERMISSION.PRODUCTS_UPDATE],
};

export function hasPermission(role: Role, permission: Permission) {
  return permissions[role].includes(permission);
}
