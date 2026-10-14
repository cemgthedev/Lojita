import { http } from "@/api/http";
import { endpoints } from "@/api/resources/endpoints";
import type { CreateProductImage } from "@/api/resources/products/product-images/validations/create.schema";
import {
  productImageSchema,
  type ProductImage,
} from "@/api/resources/products/product-images/validations/product-image.schema";
import {
  productImageQuerySchema,
  type ProductImageQuery,
} from "@/api/resources/products/product-images/validations/query.schema";
import type { UpdateProductImage } from "@/api/resources/products/product-images/validations/update.schema";

function productImageEndpoint(id: string) {
  return `${endpoints.productImages}/${encodeURIComponent(id)}`;
}

function queryString(query?: ProductImageQuery) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(
    productImageQuerySchema.parse(query ?? {}),
  )) {
    if (value !== undefined) params.set(key, String(value));
  }
  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export const productImagesService = {
  async list(query?: ProductImageQuery): Promise<ProductImage[]> {
    const response = await http.get<unknown>(
      `${endpoints.productImages}${queryString(query)}`,
    );
    return productImageSchema.array().parse(response.data);
  },

  async findById(id: string): Promise<ProductImage> {
    const response = await http.get<unknown>(productImageEndpoint(id));
    return productImageSchema.parse(response.data);
  },

  async create(image: CreateProductImage): Promise<ProductImage> {
    const response = await http.post<unknown>(endpoints.productImages, image);
    return productImageSchema.parse(response.data);
  },

  async update({ id, ...image }: UpdateProductImage): Promise<ProductImage> {
    const response = await http.put<unknown>(
      productImageEndpoint(id ?? ""),
      image,
    );
    return productImageSchema.parse(response.data);
  },

  async remove(id: string): Promise<void> {
    await http.delete<void>(productImageEndpoint(id));
  },
};
