import {Product} from "#/types";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const cmsAPI = createApi({
  reducerPath: "itemApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `products/${slug}`,
    }),
    listProducts: builder.query<Product[], ListArgs>({
      query: (listArgs) => {
        const queryString = parseListArgsToStrapiQueryString(listArgs);
        return `products?${queryString}`;
      },
    }),
  }),
});

export const { useGetProductBySlugQuery, useListProductsQuery } = cmsAPI;

export interface ListArgs {
  start: number;
  limit: number;
}

function parseListArgsToStrapiQueryString(args: object): string {
  const objectWithUnderscoreKey: Record<string, string> = {};

  Object.entries(args).forEach(([key, value]) => {
    objectWithUnderscoreKey["_" + key] = value.toString();
  });

  const qs = new URLSearchParams(objectWithUnderscoreKey);
  return qs.toString();
}
