import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { AccountResponse } from '@/models/account';
import { prepareHeaders } from '@/redux/utils';

export const TAGS = {
  CURRENT_ACCOUNT: 'CurrentAccount',
};

export const coreApi = createApi({
  reducerPath: 'coreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
    prepareHeaders: async headers => await prepareHeaders(headers),
  }),
  tagTypes: [TAGS.CURRENT_ACCOUNT],
  endpoints: builder => ({
    currentAccount: builder.query<AccountResponse, void>({
      query: () => ({ url: '/logged-account' }),
      providesTags: [TAGS.CURRENT_ACCOUNT],
    }),
  }),
});

export const { useCurrentAccountQuery } = coreApi;
