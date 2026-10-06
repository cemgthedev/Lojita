import type { Role } from "@/types/Auth";

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  document: string;
  role: Role[];

  createdAt: string;
  updatedAt: string;
};
