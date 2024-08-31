import { AddInvestmentRequest } from '@/models/investment';
import { Investment } from '@/types/data';

import { coreApi, TAGS } from './core.service';

export const investmentsApi = coreApi.injectEndpoints({
  endpoints: builder => ({
    getInvestments: builder.query<Investment[], void>({
      query: () => ({ url: '/locations' }),
      providesTags: [TAGS.INVESTMENTS],
    }),
    getSingleInvestment: builder.query<Investment, number>({
      query: id => ({ url: `/locations/${id}` }),
    }),
    createInvestment: builder.mutation<Investment, AddInvestmentRequest>({
      query: data => ({ url: '/locations', method: 'POST', body: data }),
      invalidatesTags: [TAGS.INVESTMENTS],
    }),
  }),
});

export const { useGetInvestmentsQuery, useGetSingleInvestmentQuery, useCreateInvestmentMutation } =
  investmentsApi;
