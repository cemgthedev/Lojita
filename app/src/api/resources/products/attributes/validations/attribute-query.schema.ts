import { z } from "zod";

export const attributeQuerySchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  type: z.string().optional(),
});

export type AttributeQuery = z.infer<typeof attributeQuerySchema>;
