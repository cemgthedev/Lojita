import { categorySchema } from "@/api/resources/categories/validations/category.schema";
import { z } from "zod";

export const createCategorySchema = categorySchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});

export type CreateCategory = z.infer<typeof createCategorySchema>;
