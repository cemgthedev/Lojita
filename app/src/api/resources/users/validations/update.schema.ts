import { createUserSchema } from "@/api/resources/users/validations/create.schema";
import { z } from "zod";

export const updateUserSchema = createUserSchema.partial();

export type UpdateUser = z.infer<typeof updateUserSchema>;