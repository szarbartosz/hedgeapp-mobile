import { Office } from '@/models/offices';

import { coreApi, TAGS } from './core.service';

export const officesApi = coreApi.injectEndpoints({
  endpoints: builder => ({
    getOffices: builder.query<Office[], void>({
      query: () => ({ url: '/offices' }),
      providesTags: [TAGS.OFFICES],
    }),
    getSingleOffice: builder.query<Office, number>({
      query: id => ({ url: `/offices/${id}` }),
      providesTags: [TAGS.OFFICES],
    }),
  }),
});

export const { useGetOfficesQuery, useGetSingleOfficeQuery } = officesApi;
