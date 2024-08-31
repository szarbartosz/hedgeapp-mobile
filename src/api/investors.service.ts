import { Investor } from '@/types/data';

import { coreApi, TAGS } from './core.service';

export const investorsApi = coreApi.injectEndpoints({
  endpoints: builder => ({
    getInvestors: builder.query<Investor[], void>({
      query: () => ({ url: '/investors' }),
      providesTags: [TAGS.INVESTORS],
    }),
    getSingleInvestor: builder.query<Investor, number>({
      query: id => ({ url: `/investors/${id}` }),
    }),
  }),
});

export const { useGetInvestorsQuery, useGetSingleInvestorQuery } = investorsApi;
