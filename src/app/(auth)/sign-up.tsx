import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@react-navigation/native';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Pressable, Text, View } from 'react-native';

import { useSignUpMutation } from '@/api/auth.service';
import Input from '@/components/input';
import ToastMessage from '@/components/toast-message';
import { useAuth } from '@/context/auth-context';
import { AuthData, SignUpRequest } from '@/models/auth';
import { signUpValidationSchema } from '@/utils/schemas';

const SignUpScreen: FC = () => {
  const { refetchAccount } = useAuth();
  const [hidePassword, _setHidePassword] = useState<boolean>(true);
  const [signUp] = useSignUpMutation();
  const { colors } = useTheme();

  const { control, handleSubmit } = useForm<SignUpRequest>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(signUpValidationSchema),
  });

  const onSubmit = async (credentials: SignUpRequest) => {
    const signUpResult: QueryReturnValue<AuthData> = await signUp({
      ...credentials,
    });

    if (signUpResult?.data) {
      await SecureStore.setItemAsync('token', signUpResult.data.response?.token || '');
      await refetchAccount();
      router.navigate('/(auth)/account-details');
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
          <Input
            name="confirmPassword"
            placeholder="potwierdź hasło"
            control={control}
            keyboardType="default"
            autoCapitalize="none"
            secureTextEntry={hidePassword}
            textContentType="oneTimeCode"
          />
        </View>
        <View>
          <Button title="Zarejestruj się" onPress={handleSubmit(onSubmit)} />
        </View>
        <View>
          <Text style={{ color: colors.text }}>Masz już konto?</Text>
          <Pressable
            onPress={() => {
              router.replace('/(auth)/sign-in');
            }}>
            <Text style={{ color: colors.text }}>Zaloguj się</Text>
          </Pressable>
        </View>
      </View>
      <ToastMessage />
    </View>
  );
};

export default SignUpScreen;
