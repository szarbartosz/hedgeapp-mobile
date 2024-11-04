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

const endpointsExceptions: string[] = ['signIn', 'signUp'];

export const rtkQueryErrorLogger: Middleware = () => next => (action: unknown) => {
  const typedAction = action as Action;

  const endpointName = typedAction.meta?.arg?.endpointName;

  if (
    endpointName !== 'currentUser' &&
    endpointsExceptions.includes(endpointName) &&
    (isRejectedWithValue(action) || isRejected(action))
  ) {
    Toast.show({
      type: 'error',
      props: {
        text1: 'Wystąpił błąd!',
        text2: typedAction.payload?.data?.message || 'Coś poszło nie tak...',
      },
    });
  }
  return next(typedAction);
};

export const authorizationMiddleware: Middleware = () => next => async (action: unknown) => {
  const typedAction = action as Action;

  const endpointName = typedAction.meta?.arg?.endpointName;

  if (isRejected(action) && typedAction?.payload?.status === 401) {
    await SecureStore.deleteItemAsync('token');
    if (endpointName != 'signIn') {
      router.navigate('/(auth)/sign-in');
    }
  }
  return next(typedAction);
};

export const rootMiddleware = [coreApi.middleware];
export const middlewares = [rtkQueryErrorLogger, authorizationMiddleware];
