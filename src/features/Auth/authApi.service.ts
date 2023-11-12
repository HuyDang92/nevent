import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store/store';
import { assignNewToken, logout } from '../Auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.loggedIn && (getState() as RootState).auth?.accessToken?.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const navigate = (window as any).navigate;
  const refheshToken = (api.getState() as RootState).auth?.refreshToken?.token;
  let result = await baseQuery(args, api, extraOptions);

  // Kiểm tra xem yêu cầu có trả về lỗi và mã trạng thái là 401 hay không
  if (result.error && result.error.status === 401) {
    // Thử lấy token mới thông qua yêu cầu '/refreshToken'
    const refreshResult: any = await baseQuery(`/api/auth/refresh/${refheshToken}`, api, extraOptions);

    if (refreshResult.data) {
      // Lưu trữ token mới vào Redux store thông qua action `tokenReceived`
      api.dispatch(assignNewToken(refreshResult?.data?.data?.token?.accessToken));
      // Thử lại yêu cầu ban đầu sau khi có token mới
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Nếu không lấy được token mới, dispatch action `loggedOut`
      api.dispatch(logout());
      navigate('/login');
    }
  }

  // Trả về kết quả cuối cùng của yêu cầu
  return result;
};
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 0,
  tagTypes: ['ticket'],
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
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
        },
        body: body,
      }),
    }),
    checkedViewNotifycation: builder.mutation({
      query: () => ({
        url: '/api/notifications/view',
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
        },
      }),
    }),
    swapTicket: builder.mutation({
      query: (body) => ({
        url: '/api/my-tickets/swap-ticket',
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: body,
      }),
      invalidatesTags: ['ticket'],
    }),
    getTokenFromRefreshToken: builder.query<any, string>({
      query: (refreshToken) => `/api/auth/refresh/${refreshToken}`,
    }),
    verifyTicket: builder.query<any, string>({
      query: (signature) => `/api/signatures/verify?${signature}`,
    }),
    getUserByEmail: builder.query<any, string>({
      query: (email) => `/api/users/email/${email}`,
    }),
    getProfile: builder.query<any, void>({
      query: () => `/api/auth/profile`,
    }),
    getMyTicket: builder.query<any, void>({
      query: () => `/api/my-tickets`,
      providesTags: ['ticket'],
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
  useLazyVerifyTicketQuery,
  useLazyGetUserByEmailQuery,
  useSwapTicketMutation,
} = authApi;
