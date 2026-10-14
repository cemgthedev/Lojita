import { http } from "@/api/http";
import { endpoints } from "@/api/resources/endpoints";
import type { CreateVariantImage } from "@/api/resources/products/variant-images/validations/create.schema";
import {
  variantImageQuerySchema,
  type VariantImageQuery,
} from "@/api/resources/products/variant-images/validations/query.schema";
import type { UpdateVariantImage } from "@/api/resources/products/variant-images/validations/update.schema";
import {
  variantImageSchema,
  type VariantImage,
} from "@/api/resources/products/variant-images/validations/variant-image.schema";

function variantImageEndpoint(id: string) {
  return `${endpoints.variantImages}/${encodeURIComponent(id)}`;
}

function queryString(query?: VariantImageQuery) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(
    variantImageQuerySchema.parse(query ?? {}),
  )) {
    if (value !== undefined) params.set(key, String(value));
  }
  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export const variantImagesService = {
  async list(query?: VariantImageQuery): Promise<VariantImage[]> {
    const response = await http.get<unknown>(
      `${endpoints.variantImages}${queryString(query)}`,
    );
    return variantImageSchema.array().parse(response.data);
  },

  async findById(id: string): Promise<VariantImage> {
    const response = await http.get<unknown>(variantImageEndpoint(id));
    return variantImageSchema.parse(response.data);
  },

  async create(image: CreateVariantImage): Promise<VariantImage> {
    const response = await http.post<unknown>(endpoints.variantImages, image);
    return variantImageSchema.parse(response.data);
  },

  async update({ id, ...image }: UpdateVariantImage): Promise<VariantImage> {
    const response = await http.put<unknown>(
      variantImageEndpoint(id ?? ""),
      image,
    );
    return variantImageSchema.parse(response.data);
  },

  async remove(id: string): Promise<void> {
    await http.delete<void>(variantImageEndpoint(id));
  },
};
