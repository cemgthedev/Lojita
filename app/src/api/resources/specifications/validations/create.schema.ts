import { specificationSchema } from "@/api/resources/specifications/validations/specification.schema";
import { z } from "zod";

export const createSpecificationSchema = specificationSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});

export type CreateSpecification = z.infer<typeof createSpecificationSchema>;
