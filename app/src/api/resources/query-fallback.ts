import type { UseQueryResult } from "@tanstack/react-query";

export type QueryResultWithFallback<T> = Omit<
  UseQueryResult<T, Error>,
  "data"
> & {
  data: T | undefined;
};

export function withMockArrayFallback<T>(
  query: UseQueryResult<T[], Error>,
  mockData: T[],
): QueryResultWithFallback<T[]> {
  const data =
    query.isPending || (!query.isError && query.data?.length)
      ? query.data
      : mockData;

  return { ...query, data };
}

export function withMockDetailFallback<T>(
  query: UseQueryResult<T, Error>,
  mockData: T | undefined,
): QueryResultWithFallback<T> {
  const data =
    query.isPending || (!query.isError && query.data)
      ? query.data
      : mockData;

  return { ...query, data };
}

export function filterMockData<T extends object>(
  data: T[],
  query: Partial<Record<keyof T, unknown>> = {},
): T[] {
  return data.filter((item) =>
    Object.entries(query).every(
      ([key, value]) =>
        value === undefined || item[key as keyof T] === value,
    ),
  );
}

export function assertNoMockIds(
  resource: string,
  ...ids: (string | undefined)[]
) {
  if (ids.some((id) => id?.startsWith("mock-"))) {
    throw new Error(
      `Dados demonstrativos de ${resource} não podem ser alterados pela API.`,
    );
  }
}
