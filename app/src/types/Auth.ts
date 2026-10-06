import { z } from "zod";

export const ROLE = {
  ADMIN: "admin",
  SUPPORT: "support",
  SELLER: "seller",
  CUSTOMER: "customer",
};

export const roleSchema = z.enum(ROLE);

export type Role = z.infer<typeof roleSchema>;

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
}
