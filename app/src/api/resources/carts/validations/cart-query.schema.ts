import { z } from "zod";

export const cartQuerySchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
});

export type CartQuery = z.infer<typeof cartQuerySchema>;
