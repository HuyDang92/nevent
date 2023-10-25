import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store/store';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
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
  tagTypes: ['cate'],
  // providesTags: ['cate'], // cho query
  // invalidatesTags: ['cate'], // cho mutation

  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (body) => ({
        url: '/api/categories/create',
        method: 'POST',
        body: body,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ body, cateId }) => ({
        url: `/api/categories/update/${cateId}`,
        method: 'PATCH',
        body: body,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (cateId) => ({
        url: `/api/categories/delete/${cateId}`,
        method: 'DELETE',
      }),
    }),

    getAllCategory: builder.query<any, void>({
      query: () => `/api/categories/get-all`,
    }),
    getCategoryById: builder.query<any, string>({
      query: (cateId) => `/api/categories/get-detail/${cateId}`,
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useGetCategoryByIdQuery,
} = categoryApi;
