import { attributeSchema } from "@/api/resources/products/attributes/validations/attribute.schema";
import { z } from "zod";

export const updateAttributeSchema = attributeSchema.partial().omit({
  updatedAt: true,
  createdAt: true,
});

export type UpdateAttribute = z.infer<typeof updateAttributeSchema>;
