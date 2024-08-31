import { Office } from '@/models/offices';

import { coreApi, TAGS } from './core.service';

export const officesApi = coreApi.injectEndpoints({
  endpoints: builder => ({
    getOffices: builder.query<Office[], void>({
      query: () => ({ url: '/offices' }),
      providesTags: [TAGS.OFFICES],
    }),
  }),
});

export const { useGetOfficesQuery } = officesApi;
