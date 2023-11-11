import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store/store';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
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
  // providesTags: ['cate'], // cho query
  // invalidatesTags: ['cate'], // cho mutation

  endpoints: (builder) => ({
    payTicket: builder.mutation({
      query: (body) => ({
        url: '/api/payments/vnpay',
        method: 'POST',
        body: body,
      }),
    }),
    getHistory: builder.query<any, void>({
      query: () => `/api/payments/history`,
    }),
  }),
});

export const { usePayTicketMutation, useGetHistoryQuery } = paymentApi;
