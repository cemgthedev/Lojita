import { z } from "zod";
import { storeStatusSchema } from "@/api/resources/stores/validations/status.schema";

export const storeQuerySchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  logoUrl: z.string().optional(),
  businessEmail: z.string().optional(),
  phone: z.string().optional(),
  url: z.string().optional(),
  status: storeStatusSchema.optional(),
});

export type StoreQuery = z.infer<typeof storeQuerySchema>;
