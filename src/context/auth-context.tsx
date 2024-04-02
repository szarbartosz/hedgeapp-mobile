import { router, useNavigationContainerRef } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { coreApi, useCurrentAccountQuery } from '@/api/core.service';
import { Account, AccountQueryDefinition } from '@/types/auth';

type AuthContextData = {
  account: Account;
  refetchAccount: () => AccountQueryDefinition;
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
  const { data: account, refetch: refetchAccount } = useCurrentAccountQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (account && !account.details) {
      router.navigate('/(auth)/account-details');
    }
  }, [account]);

  const signOut = async () => {
    await SecureStore.deleteItemAsync('token');
    dispatch(coreApi.util.resetApiState());
  };

  useContextReadiness();

  return (
    <AuthContext.Provider
      value={{
        account,
        refetchAccount,
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
