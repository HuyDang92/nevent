import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { RootState } from '~/store/store';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
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
  endpoints(build) { 
    return {};
  },
});
