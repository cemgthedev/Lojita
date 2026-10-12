import { z } from "zod";

export const storeQuerySchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  logoUrl: z.string().optional(),
  businessEmail: z.string().optional(),
  phone: z.string().optional(),
  url: z.string().optional(),
});

export type StoreQuery = z.infer<typeof storeQuerySchema>;
