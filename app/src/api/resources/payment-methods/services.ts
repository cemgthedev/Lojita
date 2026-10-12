import { http } from "@/api/http";
import { endpoints } from "@/api/resources/endpoints";
import type { CreatePaymentMethod } from "@/api/resources/payment-methods/validations/create.schema";
import {
  paymentMethodSchema,
  type PaymentMethod,
} from "@/api/resources/payment-methods/validations/payment-method.schema";
import {
  paymentMethodQuerySchema,
  type PaymentMethodQuery,
} from "@/api/resources/payment-methods/validations/query.schema";
import type { UpdatePaymentMethod } from "@/api/resources/payment-methods/validations/update.schema";

function paymentMethodEndpoint(id: string) {
  return `${endpoints.paymentMethods}/${encodeURIComponent(id)}`;
}

function queryString(query?: PaymentMethodQuery) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(
    paymentMethodQuerySchema.parse(query ?? {}),
  )) {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  }

  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export const paymentMethodsService = {
  async list(query?: PaymentMethodQuery): Promise<PaymentMethod[]> {
    const response = await http.get<unknown>(
      `${endpoints.paymentMethods}${queryString(query)}`,
    );

    return paymentMethodSchema.array().parse(response.data);
  },

  async findById(id: string): Promise<PaymentMethod> {
    const response = await http.get<unknown>(paymentMethodEndpoint(id));

    return paymentMethodSchema.parse(response.data);
  },

  async create(createdPaymentMethod: CreatePaymentMethod): Promise<PaymentMethod> {
    const response = await http.post<unknown>(
      endpoints.paymentMethods,
      createdPaymentMethod,
    );

    return paymentMethodSchema.parse(response.data);
  },

  async update({
    id,
    ...updatedPaymentMethod
  }: UpdatePaymentMethod): Promise<PaymentMethod> {
    const response = await http.put<unknown>(
      paymentMethodEndpoint(id),
      updatedPaymentMethod,
    );

    return paymentMethodSchema.parse(response.data);
  },

  async remove(id: string): Promise<void> {
    await http.delete<void>(paymentMethodEndpoint(id));
  },
};
