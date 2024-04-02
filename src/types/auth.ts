import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from '@reduxjs/toolkit/dist/query';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';

import { AccountResponse } from '@/models/account';

export type Account = AccountResponse | undefined;
export type AccountQueryDefinition = QueryActionCreatorResult<
  QueryDefinition<
    void,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
    string,
    AccountResponse,
    'coreApi'
  >
>;
