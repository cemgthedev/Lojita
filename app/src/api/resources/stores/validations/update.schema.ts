import { createStoreSchema } from "@/api/resources/stores/validations/create.schema";
import { messages } from "@/api/resources/users/messages";
import { z } from "zod";

export const updateStoreSchema = createStoreSchema.partial().extend({
  id: z.string({ error: messages.id.invalid }).optional(),
});

export type UpdateStore = z.infer<typeof updateStoreSchema>;
