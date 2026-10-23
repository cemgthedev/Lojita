import { z } from "zod";

export const chatQuerySchema = z.object({
  id: z.string().optional(),
  type: z.string().optional(),
  closedAt: z.string().nullable().optional(),
});

export type ChatQuery = z.infer<typeof chatQuerySchema>;
