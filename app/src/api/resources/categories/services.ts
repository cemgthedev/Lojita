import { http } from "@/api/http";
import {
  categorySchema,
  type Category,
} from "@/api/resources/categories/validations/category.schema";
import type { CreateCategory } from "@/api/resources/categories/validations/create.schema";
import {
  categoryQuerySchema,
  type CategoryQuery,
} from "@/api/resources/categories/validations/query.schema";
import type { UpdateCategory } from "@/api/resources/categories/validations/update.schema";
import { endpoints } from "@/api/resources/endpoints";

function categoryEndpoint(id: string) {
  return `${endpoints.categories}/${encodeURIComponent(id)}`;
}

function queryString(query?: CategoryQuery) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(
    categoryQuerySchema.parse(query ?? {}),
  )) {
    if (value !== undefined) params.set(key, String(value));
  }

  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export const categoriesService = {
  async list(query?: CategoryQuery): Promise<Category[]> {
    const response = await http.get<unknown>(
      `${endpoints.categories}${queryString(query)}`,
    );
    return categorySchema.array().parse(response.data);
  },

  async findById(id: string): Promise<Category> {
    const response = await http.get<unknown>(categoryEndpoint(id));
    return categorySchema.parse(response.data);
  },

  async create(category: CreateCategory): Promise<Category> {
    const response = await http.post<unknown>(endpoints.categories, category);
    return categorySchema.parse(response.data);
  },

  async update({ id, ...category }: UpdateCategory): Promise<Category> {
    const response = await http.put<unknown>(
      categoryEndpoint(id ?? ""),
      category,
    );
    return categorySchema.parse(response.data);
  },

  async remove(id: string): Promise<void> {
    await http.delete<void>(categoryEndpoint(id));
  },
};
