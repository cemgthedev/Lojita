import { http } from "@/api/http";
import { endpoints } from "@/api/resources/endpoints";
import type { CreateProductReview } from "@/api/resources/product-reviews/validations/create.schema";
import {
  productReviewSchema,
  type ProductReview,
} from "@/api/resources/product-reviews/validations/product-review.schema";
import {
  productReviewQuerySchema,
  type ProductReviewQuery,
} from "@/api/resources/product-reviews/validations/query.schema";
import type { UpdateProductReview } from "@/api/resources/product-reviews/validations/update.schema";

function productReviewEndpoint(id: string) {
  return `${endpoints.productReviews}/${encodeURIComponent(id)}`;
}

function queryString(query?: ProductReviewQuery) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(
    productReviewQuerySchema.parse(query ?? {}),
  )) {
    if (value !== undefined) params.set(key, String(value));
  }
  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export const productReviewsService = {
  async list(query?: ProductReviewQuery): Promise<ProductReview[]> {
    const response = await http.get<unknown>(
      `${endpoints.productReviews}${queryString(query)}`,
    );
    return productReviewSchema.array().parse(response.data);
  },
  async findById(id: string): Promise<ProductReview> {
    const response = await http.get<unknown>(productReviewEndpoint(id));
    return productReviewSchema.parse(response.data);
  },
  async create(review: CreateProductReview): Promise<ProductReview> {
    const response = await http.post<unknown>(endpoints.productReviews, review);
    return productReviewSchema.parse(response.data);
  },
  async update({ id, ...review }: UpdateProductReview): Promise<ProductReview> {
    const response = await http.put<unknown>(
      productReviewEndpoint(id ?? ""),
      review,
    );
    return productReviewSchema.parse(response.data);
  },
  async remove(id: string): Promise<void> {
    await http.delete<void>(productReviewEndpoint(id));
  },
};
