import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store/store';

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.loggedIn && (getState() as RootState).auth?.accessToken;
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
    uploadSingleFile: builder.mutation({
      query: (body) => ({
        url: '/api/files/upload',
        method: 'POST',
        body: body,
      }),
    }),
    deleteFile: builder.mutation({
      query: ({ fileId, publicId }) => ({
        url: `/api/files/${fileId}/${publicId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useUploadSingleFileMutation, useDeleteFileMutation } = uploadApi;
