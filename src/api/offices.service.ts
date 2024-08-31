import { Office } from '@/models/offices';

import { coreApi } from './core.service';

export const officesApi = coreApi.injectEndpoints({
  endpoints: builder => ({
    getOffices: builder.query<Office[], void>({
      query: () => ({ url: '/offices' }),
    }),
  }),
});

export const { useGetOfficesQuery } = officesApi;
