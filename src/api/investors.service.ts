import { Investor } from '@/types/data';

import { coreApi } from './core.service';

export const investorsApi = coreApi.injectEndpoints({
  endpoints: builder => ({
    getInvestors: builder.query<Investor[], void>({
      query: () => ({ url: '/investors' }),
    }),
    getSingleInvestor: builder.query<Investor, number>({
      query: id => ({ url: `/investors/${id}` }),
    }),
  }),
});

export const { useGetInvestorsQuery, useGetSingleInvestorQuery } = investorsApi;
