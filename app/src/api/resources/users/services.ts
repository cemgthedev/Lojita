import { http } from "@/api/http";
import type { CreateUser } from "@/api/resources/users/validations/create.schema";
import {
  userQuerySchema,
  type UserQuery,
} from "@/api/resources/users/validations/query.schema";
import type { UpdateUser } from "@/api/resources/users/validations/update.schema";
import { userSchema, type User } from "@/api/resources/users/validations/user.schema";

const usersEndpoint = "/users";

function userEndpoint(id: string) {
  return `${usersEndpoint}/${encodeURIComponent(id)}`;
}

function queryString(query?: UserQuery) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(userQuerySchema.parse(query ?? {}))) {
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
      `${usersEndpoint}${queryString(query)}`,
    );

    return userSchema.array().parse(response.data);
  },

  async findById(id: string): Promise<User> {
    const response = await http.get<unknown>(userEndpoint(id));

    return userSchema.parse(response.data);
  },

  async create(input: CreateUser): Promise<User> {
    const response = await http.post<unknown>(usersEndpoint, input);

    return userSchema.parse(response.data);
  },

  async update(id: string, input: UpdateUser): Promise<User> {
    const response = await http.put<unknown>(userEndpoint(id), input);

    return userSchema.parse(response.data);
  },

  async remove(id: string): Promise<void> {
    await http.delete<void>(userEndpoint(id));
  },
};