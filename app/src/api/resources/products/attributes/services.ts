import { http } from "@/api/http";
import { endpoints } from "@/api/resources/endpoints";
import {
  attributeQuerySchema,
  type AttributeQuery,
} from "@/api/resources/products/attributes/validations/attribute-query.schema";
import {
  attributeValueQuerySchema,
  type AttributeValueQuery,
} from "@/api/resources/products/attributes/validations/attribute-value-query.schema";
import {
  attributeValueSchema,
  type AttributeValue,
} from "@/api/resources/products/attributes/validations/attribute-value.schema";
import {
  attributeSchema,
  type Attribute,
} from "@/api/resources/products/attributes/validations/attribute.schema";
import type { CreateAttributeValue } from "@/api/resources/products/attributes/validations/create-attribute-value.schema";
import type { CreateAttribute } from "@/api/resources/products/attributes/validations/create-attribute.schema";
import type { UpdateAttributeValue } from "@/api/resources/products/attributes/validations/update-attribute-value.schema";
import type { UpdateAttribute } from "@/api/resources/products/attributes/validations/update-attribute.schema";

function endpoint(collection: string, id: string) {
  return `${collection}/${encodeURIComponent(id)}`;
}

function queryString<T extends object>(
  schema: { parse: (value: unknown) => T },
  query?: T,
) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(schema.parse(query ?? {}))) {
    if (value !== undefined) params.set(key, String(value));
  }
  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export const attributesService = {
  async list(query?: AttributeQuery): Promise<Attribute[]> {
    const response = await http.get<unknown>(
      `${endpoints.attributes}${queryString(attributeQuerySchema, query)}`,
    );
    return attributeSchema.array().parse(response.data);
  },
  async findById(id: string): Promise<Attribute> {
    const response = await http.get<unknown>(
      endpoint(endpoints.attributes, id),
    );
    return attributeSchema.parse(response.data);
  },
  async create(attribute: CreateAttribute): Promise<Attribute> {
    const response = await http.post<unknown>(endpoints.attributes, attribute);
    return attributeSchema.parse(response.data);
  },
  async update({ id, ...attribute }: UpdateAttribute): Promise<Attribute> {
    const response = await http.put<unknown>(
      endpoint(endpoints.attributes, id ?? ""),
      attribute,
    );
    return attributeSchema.parse(response.data);
  },
  async remove(id: string): Promise<void> {
    await http.delete<void>(endpoint(endpoints.attributes, id));
  },
};

export const attributeValuesService = {
  async list(query?: AttributeValueQuery): Promise<AttributeValue[]> {
    const response = await http.get<unknown>(
      `${endpoints.attributeValues}${queryString(attributeValueQuerySchema, query)}`,
    );
    return attributeValueSchema.array().parse(response.data);
  },
  async findById(id: string): Promise<AttributeValue> {
    const response = await http.get<unknown>(
      endpoint(endpoints.attributeValues, id),
    );
    return attributeValueSchema.parse(response.data);
  },
  async create(value: CreateAttributeValue): Promise<AttributeValue> {
    const response = await http.post<unknown>(endpoints.attributeValues, value);
    return attributeValueSchema.parse(response.data);
  },
  async update({
    id,
    ...value
  }: UpdateAttributeValue): Promise<AttributeValue> {
    const response = await http.put<unknown>(
      endpoint(endpoints.attributeValues, id ?? ""),
      value,
    );
    return attributeValueSchema.parse(response.data);
  },
  async remove(id: string): Promise<void> {
    await http.delete<void>(endpoint(endpoints.attributeValues, id));
  },
};
