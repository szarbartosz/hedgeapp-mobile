import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { coreApi } from '@/api/core.service';

import { middlewares, rootMiddleware } from './middlewares';

const rootReducers = {
  [coreApi.reducerPath]: coreApi.reducer,
};

export const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(rootMiddleware).concat(middlewares),
});

setupListeners(store.dispatch);
