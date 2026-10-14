import { attributeSchema } from "@/api/resources/products/attributes/validations/attribute.schema";
import { z } from "zod";

export const createAttributeSchema = attributeSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});

export type CreateAttribute = z.infer<typeof createAttributeSchema>;
