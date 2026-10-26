import { z } from "zod";
export const orderQuerySchema = z.object({
  id: z.string().optional(),
  status: z.string().optional(),
  userId: z.string().optional(),
});
export type OrderQuery = z.infer<typeof orderQuerySchema>;
