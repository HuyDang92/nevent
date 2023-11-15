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
export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 0,
  tagTypes: ['event'],
  // providesTags: ['event'], // cho query
  // invalidatesTags: ['event'], // cho mutation

  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (body) => ({
        url: '/api/events/create',
        method: 'POST',
        body: body,
      }),
    }),
    deleteEvent: builder.mutation<void, any>({
      query: (eventId) => ({
        url: `/api/events/delete/${eventId}`,
        method: 'DELETE',
      }),
    }),

    getAllEvent: builder.query<any, any>({
      query: ({ page, limit, search, status, categories, hotLevel, start_date, location }) =>
        `/api/events/get-all?page=${page}&limit=${limit}${search ? '&search=' + search : ''}${
          status ? '&status=' + status : ''
        }${categories ? categories : ''}${hotLevel ? '&hotLevel=' + hotLevel : ''}${
          start_date ? '&start_date=' + start_date : ''
        }${location ? '&location=' + location : ''}`,
    }),

    getEventById: builder.query<any, string>({
      query: (eventId) => `/api/events/detail/${eventId}`,
    }),
    getLocations: builder.query<any, void>({
      query: () => `/api/locations`,
    }),
    getTicketByEventId: builder.query<any, string>({
      query: (eventId) => ({
        url: `/api/tickets/event/${eventId}`,
      }),
    }),
    getEventBusiness: builder.query<any, any>({
      query: ({ page, limit, search }) => ({
        url: `/api/events/business?page=${page}&limit=${limit}${search ? '&search=' + search : ''}`,
      }),
    }),
  }),
});

export const {
  useCreateEventMutation,
  useDeleteEventMutation,
  useGetAllEventQuery,
  useLazyGetAllEventQuery,
  useGetEventByIdQuery,
  useGetLocationsQuery,
  useGetTicketByEventIdQuery,
  useGetEventBusinessQuery,
} = eventApi;
