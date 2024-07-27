import { Status } from '@/models/statuses';

import { coreApi } from './core.service';

export const statusesApi = coreApi.injectEndpoints({
  endpoints: builder => ({
    getStatuses: builder.query<Status, void>({
      query: () => ({ url: '/statuses' }),
    }),
  }),
});

export const { useGetStatusesQuery, useLazyGetStatusesQuery } = statusesApi;
