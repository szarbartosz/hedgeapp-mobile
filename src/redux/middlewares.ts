import { isRejected, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';

import { coreApi } from '@/api/core.service';

type Action = {
  payload: {
    data: {
      message: string;
    };
    status: number;
  };
  meta: {
    arg: {
      endpointName: string;
    };
  };
};

export const rtkQueryErrorLogger: Middleware = () => next => (action: Action) => {
  const endpointName = action.meta?.arg?.endpointName;

  if (endpointName !== 'currentUser' && (isRejectedWithValue(action) || isRejected(action))) {
    Toast.show({
      type: 'error',
      props: {
        text1: 'Wystąpił błąd!',
        text2: action.payload?.data?.message || 'Coś poszło nie tak...',
      },
    });
  }
  return next(action as unknown as Action);
};

export const authorizationMiddleware: Middleware = () => next => async (action: Action) => {
  const endpointName = action.meta?.arg?.endpointName;

  if (isRejected(action) && action?.payload?.status === 401) {
    await SecureStore.deleteItemAsync('token');
    if (endpointName != 'signIn') {
      router.navigate('/(auth)/sign-in');
    }
  }
  return next(action as unknown as Action);
};

export const rootMiddleware = [coreApi.middleware];
export const middlewares = [rtkQueryErrorLogger, authorizationMiddleware];
