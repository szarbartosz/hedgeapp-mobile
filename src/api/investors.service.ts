import { AddInvestorRequest, UpdateInvestorRequest } from '@/models/investor';
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
      providesTags: [TAGS.INVESTORS],
    }),
    createInvestor: builder.mutation<Investor, AddInvestorRequest>({
      query: data => ({ url: '/locations', method: 'POST', body: data }),
      invalidatesTags: [TAGS.INVESTORS],
    }),
    updateInvestor: builder.mutation<Investor, { id: number; data: UpdateInvestorRequest }>({
      query: ({ id, data }) => ({ url: `/investors/${id}`, method: 'PUT', body: data }),
      invalidatesTags: [TAGS.INVESTORS],
    }),
  }),
});

export const {
  useGetInvestorsQuery,
  useGetSingleInvestorQuery,
  useCreateInvestorMutation,
  useUpdateInvestorMutation,
} = investorsApi;
