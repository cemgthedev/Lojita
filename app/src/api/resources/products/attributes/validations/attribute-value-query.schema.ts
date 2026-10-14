import { z } from "zod";

export const attributeValueQuerySchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  value: z.string().optional(),
  attributeId: z.string().optional(),
});

export type AttributeValueQuery = z.infer<typeof attributeValueQuerySchema>;
