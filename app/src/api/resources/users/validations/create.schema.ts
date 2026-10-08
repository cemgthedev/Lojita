import { userSchema } from "@/api/resources/users/validations/user.schema";
import { z } from "zod";

export const createUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateUser = z.infer<typeof createUserSchema>;