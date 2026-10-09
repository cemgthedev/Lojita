import { http } from "@/api/http";
import { endpoints } from "@/api/resources/endpoints";
import type { CreateUser } from "@/api/resources/users/validations/create.schema";
import {
  userQuerySchema,
  type UserQuery,
} from "@/api/resources/users/validations/query.schema";
import type { UpdateUser } from "@/api/resources/users/validations/update.schema";
import {
  userSchema,
  type User,
} from "@/api/resources/users/validations/user.schema";

function userEndpoint(id: string) {
  return `${endpoints.users}/${encodeURIComponent(id)}`;
}

function queryString(query?: UserQuery) {
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

export const usersService = {
  async list(query?: UserQuery): Promise<User[]> {
    const response = await http.get<unknown>(
      `${endpoints.users}${queryString(query)}`,
    );

    return userSchema.array().parse(response.data);
  },

  async findById(id: string): Promise<User> {
    const response = await http.get<unknown>(userEndpoint(id));

    return userSchema.parse(response.data);
  },

  async create(createdUser: CreateUser): Promise<User> {
    const response = await http.post<unknown>(endpoints.users, createdUser);

    return userSchema.parse(response.data);
  },

  async update({ id, ...updatedUser }: UpdateUser): Promise<User> {
    const response = await http.put<unknown>(
      userEndpoint(id ?? ""),
      updatedUser,
    );

    return userSchema.parse(response.data);
  },

  async remove(id: string): Promise<void> {
    await http.delete<void>(userEndpoint(id));
  },
};
