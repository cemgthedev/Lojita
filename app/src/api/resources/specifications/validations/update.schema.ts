import { specificationSchema } from "@/api/resources/specifications/validations/specification.schema";
import { z } from "zod";

export const updateSpecificationSchema = specificationSchema.partial().omit({
  createdAt: true,
  updatedAt: true,
});

export type UpdateSpecification = z.infer<typeof updateSpecificationSchema>;
