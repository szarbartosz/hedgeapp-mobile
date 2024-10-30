import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from '@/models/user';
import { prepareHeaders } from '@/redux/utils';

export const TAGS = {
  CURRENT_USER: 'CurrentUser',
  INVESTMENTS: 'Investments',
  INVESTORS: 'Investors',
  OFFICES: 'Offices',
};

export const coreApi = createApi({
  reducerPath: 'coreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
    prepareHeaders: async headers => await prepareHeaders(headers),
  }),
  tagTypes: [TAGS.CURRENT_USER, TAGS.INVESTMENTS, TAGS.INVESTORS, TAGS.OFFICES],
  endpoints: builder => ({
    getCurrentUser: builder.query<User, void>({
      query: () => ({ url: '/validate' }),
      providesTags: [TAGS.CURRENT_USER],
    }),
  }),
});

export const { useGetCurrentUserQuery, useLazyGetCurrentUserQuery } = coreApi;
