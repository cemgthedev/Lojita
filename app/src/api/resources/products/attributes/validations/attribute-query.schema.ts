import { attributeTypeSchema } from "@/api/resources/products/attributes/validations/attribute.schema";
import { z } from "zod";

export const attributeQuerySchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  type: attributeTypeSchema.optional(),
});

export type AttributeQuery = z.infer<typeof attributeQuerySchema>;
