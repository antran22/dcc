import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '@/redux/apiTypes';

export const cmsAPI = createApi({
  reducerPath: 'itemApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getProductBySlug: builder.query<IProduct, string>({
      query: (slug) => `products/${slug}`,
    }),
    listProducts: builder.query<IProduct[], ListArgs>({
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
    objectWithUnderscoreKey['_' + key] = value.toString();
  });

  const qs = new URLSearchParams(objectWithUnderscoreKey);
  return qs.toString();
}
