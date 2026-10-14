import { attributeValueSchema } from "@/api/resources/products/attributes/validations/attribute-value.schema";
import { z } from "zod";

export const createAttributeValueSchema = attributeValueSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});

export type CreateAttributeValue = z.infer<typeof createAttributeValueSchema>;
