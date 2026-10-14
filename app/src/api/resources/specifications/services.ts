import { http } from "@/api/http";
import { endpoints } from "@/api/resources/endpoints";
import type { CreateSpecification } from "@/api/resources/specifications/validations/create.schema";
import {
  specificationQuerySchema,
  type SpecificationQuery,
} from "@/api/resources/specifications/validations/query.schema";
import {
  specificationSchema,
  type Specification,
} from "@/api/resources/specifications/validations/specification.schema";
import type { UpdateSpecification } from "@/api/resources/specifications/validations/update.schema";

function specificationEndpoint(id: string) {
  return `${endpoints.specifications}/${encodeURIComponent(id)}`;
}

function queryString(query?: SpecificationQuery) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(
    specificationQuerySchema.parse(query ?? {}),
  )) {
    if (value !== undefined) params.set(key, String(value));
  }
  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export const specificationsService = {
  async list(query?: SpecificationQuery): Promise<Specification[]> {
    const response = await http.get<unknown>(
      `${endpoints.specifications}${queryString(query)}`,
    );
    return specificationSchema.array().parse(response.data);
  },
  async findById(id: string): Promise<Specification> {
    const response = await http.get<unknown>(specificationEndpoint(id));
    return specificationSchema.parse(response.data);
  },
  async create(specification: CreateSpecification): Promise<Specification> {
    const response = await http.post<unknown>(
      endpoints.specifications,
      specification,
    );
    return specificationSchema.parse(response.data);
  },
  async update({
    id,
    ...specification
  }: UpdateSpecification): Promise<Specification> {
    const response = await http.put<unknown>(
      specificationEndpoint(id ?? ""),
      specification,
    );
    return specificationSchema.parse(response.data);
  },
  async remove(id: string): Promise<void> {
    await http.delete<void>(specificationEndpoint(id));
  },
};
