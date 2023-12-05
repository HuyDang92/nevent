import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store/store';
import { assignNewToken, logout } from '../Auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.loggedIn && (getState() as RootState).auth?.accessToken?.token;
    const code = (getState() as RootState).otp.code;
    const secret = (getState() as RootState).otp.secret;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    if (code && secret) {
      headers.set('otp', code);
      headers.set('otp-secret', secret);
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
export const otpApi = createApi({
  reducerPath: 'otpApi',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 0,
  tagTypes: ['cate'],
  // providesTags: ['cate'], // cho query
  // invalidatesTags: ['cate'], // cho mutation

  endpoints: (builder) => ({
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
    verifySwapTicket: builder.mutation({
      query: (body) => ({
        url: '/api/my-tickets/swap-ticket',
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: body,
      }),
    }),
    sendOtpNoLogin: builder.mutation({
      query: (body) => ({
        url: '/api/otp',
        method: 'POST',
        body: body,
      }),
    }),

    sendOtpLogin: builder.query<any, void>({
      query: () => `/api/otp`,
    }),
  }),
});

export const {
  useForgotPassWordMutation,
  useSendOtpNoLoginMutation,
  useSendOtpLoginQuery,
  useLazySendOtpLoginQuery,
  useVerifySwapTicketMutation,
} = otpApi;
