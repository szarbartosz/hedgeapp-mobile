import { router, useNavigationContainerRef } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

import { coreApi } from '@/api/core.service';

type AuthContextData = {
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type Props = {
  children: React.ReactNode;
};

const useContextReadiness = () => {
  const [isNavigationReady, setNavigationReady] = useState<boolean>(false);
  const rootNavigation = useNavigationContainerRef();

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener('state', () => {
      setNavigationReady(true);
    });
    return () => unsubscribe?.();
  }, [rootNavigation]);

  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }
  }, [isNavigationReady]);
};

const AuthProvider: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        router.navigate('/(auth)/sign-in');
      }
    };

    getToken().catch(_err => {
      Toast.show({
        type: 'error',
        props: {
          text1: 'Wystąpił błąd!',
          text2: 'Coś poszło nie tak...',
        },
      });
    });
  }, []);

  const signOut = async () => {
    await SecureStore.deleteItemAsync('token');
    dispatch(coreApi.util.resetApiState());
    router.navigate('/(auth)/sign-in');
  };

  useContextReadiness();

  return (
    <AuthContext.Provider
      value={{
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthProvider;
