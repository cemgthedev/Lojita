import { http } from "@/api/http";
import { endpoints } from "@/api/resources/endpoints";
import type { CreateStore } from "@/api/resources/stores/validations/create.schema";
import {
  storeQuerySchema,
  type StoreQuery,
} from "@/api/resources/stores/validations/query.schema";
import {
  storeSchema,
  type Store,
} from "@/api/resources/stores/validations/store.schema";
import type { UpdateStore } from "@/api/resources/stores/validations/update.schema";

function storesEndpoint(id: string) {
  return `${endpoints.stores}/${encodeURIComponent(id)}`;
}

function queryString(query?: StoreQuery) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(
    storeQuerySchema.parse(query ?? {}),
  )) {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  }

  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export const storesService = {
  async list(query?: StoreQuery): Promise<Store[]> {
    const response = await http.get<unknown>(
      `${endpoints.stores}${queryString(query)}`,
    );

    return storeSchema.array().parse(response.data);
  },

  async findById(id: string): Promise<Store> {
    const response = await http.get<unknown>(storesEndpoint(id));

    return storeSchema.parse(response.data);
  },

  async create(createdStore: CreateStore): Promise<Store> {
    const response = await http.post<unknown>(endpoints.stores, createdStore);

    return storeSchema.parse(response.data);
  },

  async update({ id, ...updatedStore }: UpdateStore): Promise<Store> {
    const response = await http.put<unknown>(
      storesEndpoint(id ?? ""),
      updatedStore,
    );

    return storeSchema.parse(response.data);
  },

  async remove(id: string): Promise<void> {
    await http.delete<void>(storesEndpoint(id));
  },
};
