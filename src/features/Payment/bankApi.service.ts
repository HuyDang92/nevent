import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

interface IBank {
  id: number;
  name: string;
  code: string;
  bin: string;
  shortName: string;
  logo: string;
  transferSupported: number;
  lookupSupported: number;
}

interface IBankResponse {
  data: IBank[];
  code: string;
  desc: string;
}

export const bankApi = createApi({
  reducerPath: 'bankApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.vietqr.io/v2',
  }),
  endpoints: (build) => ({
    getBankList: build.query<IBankResponse, void>({
      query: () => '/banks',
    }),
  }),
});

export const { useGetBankListQuery } = bankApi;
