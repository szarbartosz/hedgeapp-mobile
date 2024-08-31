import { Investment } from '@/types/data';

import { coreApi } from './core.service';

export const investmentsApi = coreApi.injectEndpoints({
  endpoints: builder => ({
    getInvestments: builder.query<Investment[], void>({
      query: () => ({ url: '/locations' }),
    }),
    getSingleInvestment: builder.query<Investment, number>({
      query: id => ({ url: `/locations/${id}` }),
    }),
    createInvestment: builder.mutation<Investment, Partial<Investment>>({
      query: data => ({ url: '/locations', method: 'POST', body: data }),
    }),
  }),
});

export const { useGetInvestmentsQuery, useGetSingleInvestmentQuery, useCreateInvestmentMutation } =
  investmentsApi;
