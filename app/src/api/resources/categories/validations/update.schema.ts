import { categorySchema } from "@/api/resources/categories/validations/category.schema";
import { z } from "zod";

export const updateCategorySchema = categorySchema.partial().omit({
  createdAt: true,
  updatedAt: true,
});

export type UpdateCategory = z.infer<typeof updateCategorySchema>;
