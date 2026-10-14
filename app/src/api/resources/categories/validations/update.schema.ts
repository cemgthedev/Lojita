import { categorySchema } from "@/api/resources/categories/validations/category.schema";
import { z } from "zod";

export const updateCategorySchema = categorySchema.partial().omit({
  updatedAt: true,
  createdAt: true,
});

export type UpdateCategory = z.infer<typeof updateCategorySchema>;
