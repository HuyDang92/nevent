import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store/store';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth?.loggedIn && (getState() as RootState).auth?.accessToken.token;
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    LoginGoogle: builder.mutation({
      query: ({ code, base }) => ({
        url: 'auth/google/verify',
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: { code: code, baseId: base },
      }),
    }),
    getTokenFromRefreshToken: builder.mutation({
      query: ({ token }) => ({
        url: 'auth/refresh',
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: { token: token },
      }),
    }),
  }),
});

export const { useLoginGoogleMutation, useGetTokenFromRefreshTokenMutation } = authApi;
