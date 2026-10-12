import { http } from "@/api/http";
import {
  addressSchema,
  type Address,
} from "@/api/resources/addresses/validations/address.schema";
import type { CreateAddress } from "@/api/resources/addresses/validations/create.schema";
import type { AddressQuery } from "@/api/resources/addresses/validations/query.schema";
import type { UpdateAddress } from "@/api/resources/addresses/validations/update.schema";
import { endpoints } from "@/api/resources/endpoints";
import { userQuerySchema } from "@/api/resources/users/validations/query.schema";

function addressEndpoint(id: string) {
  return `${endpoints.addresses}/${encodeURIComponent(id)}`;
}

function queryString(query?: AddressQuery) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(
    userQuerySchema.parse(query ?? {}),
  )) {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  }

  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export const addressesService = {
  async list(query?: AddressQuery): Promise<Address[]> {
    const response = await http.get<unknown>(
      `${endpoints.addresses}${queryString(query)}`,
    );

    return addressSchema.array().parse(response.data);
  },

  async findById(id: string): Promise<Address> {
    const response = await http.get<unknown>(addressEndpoint(id));

    return addressSchema.parse(response.data);
  },

  async create(createdAddress: CreateAddress): Promise<Address> {
    const response = await http.post<unknown>(
      endpoints.addresses,
      createdAddress,
    );

    return addressSchema.parse(response.data);
  },

  async update({ id, ...updatedAddress }: UpdateAddress): Promise<Address> {
    const response = await http.put<unknown>(
      addressEndpoint(id ?? ""),
      updatedAddress,
    );

    return addressSchema.parse(response.data);
  },

  async remove(id: string): Promise<void> {
    await http.delete<void>(addressEndpoint(id));
  },
};
