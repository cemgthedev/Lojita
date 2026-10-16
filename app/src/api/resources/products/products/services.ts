import { http } from "@/api/http";
import { endpoints } from "@/api/resources/endpoints";
import type { CreateProduct } from "@/api/resources/products/products/validations/create.schema";
import {
  productSchema,
  type Product,
} from "@/api/resources/products/products/validations/product.schema";
import {
  productQuerySchema,
  type ProductQuery,
} from "@/api/resources/products/products/validations/query.schema";
import type { UpdateProduct } from "@/api/resources/products/products/validations/update.schema";
import { assertNoMockIds } from "@/api/resources/query-fallback";

function productEndpoint(id: string) {
  return `${endpoints.products}/${encodeURIComponent(id)}`;
}

function queryString(query?: ProductQuery) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(
    productQuerySchema.parse(query ?? {}),
  )) {
    if (value !== undefined) params.set(key, String(value));
  }
  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export const productsService = {
  async list(query?: ProductQuery): Promise<Product[]> {
    const response = await http.get<unknown>(
      `${endpoints.products}${queryString(query)}`,
    );
    return productSchema.array().parse(response.data);
  },

  async findById(id: string): Promise<Product> {
    const response = await http.get<unknown>(productEndpoint(id));
    return productSchema.parse(response.data);
  },

  async create(product: CreateProduct): Promise<Product> {
    assertNoMockIds("produto", product.storeId, product.categoryId);
    const response = await http.post<unknown>(endpoints.products, product);
    return productSchema.parse(response.data);
  },

  async update({ id, ...product }: UpdateProduct): Promise<Product> {
    assertNoMockIds("produto", id, product.storeId, product.categoryId);
    const response = await http.put<unknown>(
      productEndpoint(id ?? ""),
      product,
    );
    return productSchema.parse(response.data);
  },

  async remove(id: string): Promise<void> {
    assertNoMockIds("produto", id);
    await http.delete<void>(productEndpoint(id));
  },
};
