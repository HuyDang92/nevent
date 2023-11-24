import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const locationApi = createApi({
  reducerPath: 'bankApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://provinces.open-api.vn/api',
  }),
  endpoints: (build) => ({
    getLocations: build.query<any, void>({
      query: () => '/?depth=3',
    }),
  }),
});
export const { useGetLocationsQuery } = locationApi;
