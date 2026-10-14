import { z } from "zod";

export const specificationQuerySchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  productId: z.string().optional(),
});

export type SpecificationQuery = z.infer<typeof specificationQuerySchema>;
