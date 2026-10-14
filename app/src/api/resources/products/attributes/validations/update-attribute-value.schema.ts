import { attributeValueSchema } from "@/api/resources/products/attributes/validations/attribute-value.schema";
import { z } from "zod";

export const updateAttributeValueSchema = attributeValueSchema.partial().omit({
  createdAt: true,
  updatedAt: true,
});

export type UpdateAttributeValue = z.infer<typeof updateAttributeValueSchema>;
