import { http } from "@/api/http";
import { endpoints } from "@/api/resources/endpoints";
import type { CreateVariant } from "@/api/resources/products/variants/validations/create.schema";
import {
  variantQuerySchema,
  type VariantQuery,
} from "@/api/resources/products/variants/validations/query.schema";
import type { UpdateVariant } from "@/api/resources/products/variants/validations/update.schema";
import {
  variantSchema,
  type Variant,
} from "@/api/resources/products/variants/validations/variant.schema";

function variantEndpoint(id: string) {
  return `${endpoints.variants}/${encodeURIComponent(id)}`;
}

function queryString(query?: VariantQuery) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(
    variantQuerySchema.parse(query ?? {}),
  )) {
    if (value !== undefined) params.set(key, String(value));
  }
  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export const variantsService = {
  async list(query?: VariantQuery): Promise<Variant[]> {
    const response = await http.get<unknown>(
      `${endpoints.variants}${queryString(query)}`,
    );
    return variantSchema.array().parse(response.data);
  },

  async findById(id: string): Promise<Variant> {
    const response = await http.get<unknown>(variantEndpoint(id));
    return variantSchema.parse(response.data);
  },

  async create(variant: CreateVariant): Promise<Variant> {
    const response = await http.post<unknown>(endpoints.variants, variant);
    return variantSchema.parse(response.data);
  },

  async update({ id, ...variant }: UpdateVariant): Promise<Variant> {
    const response = await http.put<unknown>(
      variantEndpoint(id ?? ""),
      variant,
    );
    return variantSchema.parse(response.data);
  },

  async remove(id: string): Promise<void> {
    await http.delete<void>(variantEndpoint(id));
  },
};
