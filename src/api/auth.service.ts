import { AuthData, SignInRequest, SignUpRequest } from '@/models/auth';

import { coreApi } from './core.service';

export const authApi = coreApi.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<AuthData, SignInRequest>({
      query: data => ({ url: '/login', method: 'POST', body: data }),
    }),
    signUp: builder.mutation<AuthData, SignUpRequest>({
      query: data => ({ url: '/register', method: 'POST', body: data }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
