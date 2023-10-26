import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store/store';

export const eventApi = createApi({
  reducerPath: 'eventApi',
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
    deleteEvent: builder.mutation({
      query: (eventId) => ({
        url: `/api/categories/delete/${eventId}`,
        method: 'DELETE',
      }),
    }),

    getAllEvent: builder.query<any, any>({
      query: ({ page, limit, search }) =>
        `/api/events/get-all?page=${page}&limit=${limit}${search ? '&search=' + search : ''}`,
    }),
    getEventById: builder.query<any, string>({
      query: (eventId) => `/api/events/detail/${eventId}`,
    }),
  }),
});

export const {
  useCreateEventMutation,
  useDeleteEventMutation,
  useGetAllEventQuery,
  useLazyGetAllEventQuery,
  useGetEventByIdQuery,
} = eventApi;
