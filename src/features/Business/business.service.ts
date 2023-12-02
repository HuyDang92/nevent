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
export const businessApi = createApi({
  reducerPath: 'businessApi',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 0,
  tagTypes: ['Business'],
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
      invalidatesTags: ['Business'],
    }),
    getProfile: builder.query<any, void>({
      query: () => `/api/auth/profile`,
      providesTags: ['Business'],
    }),
    analyticsBusiness: builder.query<any, void>({
      query: () => `/api/events/overview`,
      providesTags: ['Business'],
    }),
    analyticsRevenueChart: builder.query<any, any>({
      query: ({ eventId, startDate, endDate }) =>
        `/api/payments/overview-revenue-chart${eventId ? `/${eventId}` : ''}?startDate=${startDate}&endDate=${endDate}`,
      keepUnusedDataFor: 5,
    }),
    listCustomerPayment: builder.query<any, string>({
      query: (eventId) => `/api/events/list-payment/${eventId}`,
    }),
  }),
});
export const {
  useUpdateBusinessMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useAnalyticsBusinessQuery,
  useAnalyticsRevenueChartQuery,
  useListCustomerPaymentQuery,
} = businessApi;
