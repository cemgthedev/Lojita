import {
  ROLE,
  type Role,
} from "@/api/resources/users/validations/auth.schema";

const rolePriority: Role[] = [
  ROLE.ADMIN,
  ROLE.SUPPORT,
  ROLE.SELLER,
  ROLE.CUSTOMER,
];

export function useHighestRole(roles: Role[]): Role {
  return rolePriority.find((role) => roles.includes(role)) ?? ROLE.CUSTOMER;
}
