import { AuthData, SignInRequest, SignUpRequest } from '@/models/auth';

import { coreApi } from './core.service';

export const authApi = coreApi.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<AuthData, SignInRequest>({
      query: data => ({ url: '/login', method: 'POST', body: data }),
      transformResponse: (response: null, meta) => ({
        response,
        token: meta?.response?.headers.get('Authorization') || '',
      }),
    }),
    signUp: builder.mutation<AuthData, SignUpRequest>({
      query: data => ({ url: '/register', method: 'POST', body: data }),
      transformResponse: (response: null, meta) => ({
        response,
        token: meta?.response?.headers.get('Authorization') || '',
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
