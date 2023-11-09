import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store/store';

export const authApi = createApi({
  reducerPath: 'authApi',
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
    signUpWithEmail: builder.mutation({
      query: (body) => ({
        url: '/api/auth/register',
        method: 'POST',
        body: body,
      }),
    }),
    logInWithEmail: builder.mutation({
      query: (body) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: body,
      }),
    }),
    logInGoogle: builder.mutation({
      query: (body) => ({
        url: '/api/auth/google/login',
        method: 'POST',
        body: body,
      }),
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: '/api/users/update',
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
        },
        body: body,
      }),
    }),
    forgotPassWord: builder.mutation({
      query: (body) => ({
        url: '/api/users/forgot-password',
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: body,
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: '/api/users/change-password',
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: body,
      }),
    }),
    getTokenFromRefreshToken: builder.query<any, string>({
      query: (refreshToken) => `/api/auth/refresh/${refreshToken}`,
    }),
    getProfile: builder.query<any, void>({
      query: () => `/api/auth/profile`,
    }),
    getMyTicket: builder.query<any, void>({
      query: () => `/api/my-tickets`,
    }),
  }),
});

export const {
  useSignUpWithEmailMutation,
  useLogInWithEmailMutation,
  useGetTokenFromRefreshTokenQuery,
  useLazyGetTokenFromRefreshTokenQuery,
  useGetProfileQuery,
  useLogInGoogleMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgotPassWordMutation,
  useGetMyTicketQuery,
} = authApi;
