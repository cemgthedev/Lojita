import { z } from "zod";

export const STORE_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export const STORE_STATUS_LABEL = {
  [STORE_STATUS.ACTIVE]: "Ativa",
  [STORE_STATUS.INACTIVE]: "Inativa",
} as const;

export const STORE_STATUS_VARIANT = {
  [STORE_STATUS.ACTIVE]: "success-ghost",
  [STORE_STATUS.INACTIVE]: "muted-ghost",
} as const;

export const storeStatusSchema = z.enum(STORE_STATUS);

export type StoreStatus = z.infer<typeof storeStatusSchema>;
