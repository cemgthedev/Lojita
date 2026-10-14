import { z } from "zod";

export const categoryQuerySchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
});

export type CategoryQuery = z.infer<typeof categoryQuerySchema>;
