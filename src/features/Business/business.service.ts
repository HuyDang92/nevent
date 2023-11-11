import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '~/store/store';

export const businessApi = createApi({
  reducerPath: 'businessApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.loggedIn && (getState() as RootState).auth?.accessToken?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    updateBusiness: builder.mutation({
      query: (body) => ({
        url: '/api/business-profile/update',
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
        },
        body: body,
      }),
    }),
  }),
});
export const { useUpdateBusinessMutation } = businessApi;
