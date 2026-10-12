import { storeSchema } from "@/api/resources/stores/validations/store.schema";
import { z } from "zod";

export const createStoreSchema = storeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateStore = z.infer<typeof createStoreSchema>;
