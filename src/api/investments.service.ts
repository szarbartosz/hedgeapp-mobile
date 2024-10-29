import { AddInvestmentRequest, UpdateInvestmentRequest } from '@/models/investment';
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
      providesTags: (_result, _error, arg) => [{ type: TAGS.INVESTMENTS, id: arg }],
    }),
    createInvestment: builder.mutation<Investment, AddInvestmentRequest>({
      query: data => ({ url: '/locations', method: 'POST', body: data }),
      invalidatesTags: [TAGS.INVESTMENTS],
    }),
    updateInvestment: builder.mutation<Investment, { id: number; data: UpdateInvestmentRequest }>({
      query: ({ id, data }) => ({ url: `/locations/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: TAGS.INVESTMENTS, id },
        TAGS.INVESTMENTS,
      ],
    }),
  }),
});

export const {
  useGetInvestmentsQuery,
  useGetSingleInvestmentQuery,
  useCreateInvestmentMutation,
  useUpdateInvestmentMutation,
} = investmentsApi;
