import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@react-navigation/native';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Pressable, Text, View } from 'react-native';

import { useSignInMutation } from '@/api/auth.service';

import ToastMessage from '@/components/toast-message';
import { useAuth } from '@/context/auth-context';
import { AuthData, SignInRequest } from '@/models/auth';
import { signInValidationSchema } from '@/utils/schemas';
import Input from '@/components/input';

const SignInModal: FC = () => {
  const { refetchAccount } = useAuth();
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [signIn] = useSignInMutation();
  const { colors } = useTheme();

  const { control, handleSubmit } = useForm<SignInRequest>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInValidationSchema),
  });

  const onSubmit = async (credentials: SignInRequest) => {
    const signInResult: QueryReturnValue<AuthData> = await signIn({
      ...credentials,
    });

    if (signInResult?.data) {
      await SecureStore.setItemAsync('token', signInResult.data.response.token || '');
      const currentAccount = await refetchAccount();

      if (currentAccount?.data?.details) {
        router.navigate('/(tabs)');
      } else {
        router.navigate('/(tabs)/two');
      }
    }
  };

  return (
    <View>
      <Pressable onPress={() => router.back()}>
        <Text>zamknij</Text>
      </Pressable>
      <View>
        <View>
          <Input
            name="email"
            placeholder="email"
            control={control}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            name="password"
            placeholder="hasło"
            control={control}
            keyboardType="default"
            autoCapitalize="none"
            secureTextEntry={hidePassword}
            textContentType="oneTimeCode"
          />
        </View>
        <View>
          <Button title="Zaloguj się" onPress={handleSubmit(onSubmit)} />
          <View>
            <Text style={{ color: colors.text }}>Nie masz konta?</Text>
            <Pressable
              onPress={() => {
                router.replace('/(auth)/sign-up');
              }}>
              <Text style={{ color: colors.text }}>Zarejestruj się</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <ToastMessage />
    </View>
  );
};

export default SignInModal;
