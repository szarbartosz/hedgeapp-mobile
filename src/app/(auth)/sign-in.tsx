import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@react-navigation/native';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable } from 'react-native';
import { Button, H3, H4, Text, XStack, YStack } from 'tamagui';

import { useSignInMutation } from '@/api/auth.service';
import { EyeClosedIcon } from '@/assets/icons/eye-closed-icon';
import { EyeIcon } from '@/assets/icons/eye-icon';
import Input from '@/components/input';
import ToastMessage from '@/components/toast-message';
import { useAuth } from '@/context/auth-context';
import { AuthData, SignInRequest } from '@/models/auth';
import { signInValidationSchema } from '@/utils/schemas';

const SignInModal: FC = () => {
  const { refetchAccount } = useAuth();
  const [hidePassword, _setHidePassword] = useState<boolean>(true);
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
      await SecureStore.setItemAsync('token', signInResult.data.response?.token || '');
      const currentAccount = await refetchAccount();

      if (currentAccount?.data?.details) {
        router.navigate('/(tabs)');
      } else {
        router.navigate('/(tabs)/two');
      }
    }
  };

  return (
    <YStack marginHorizontal={24} gap="$8">
      <YStack marginTop={128}>
        <H3 color="$color">Miło Cię widzieć!</H3>
        <H4 color="$color">Zaloguj się lub zarejestruj</H4>
      </YStack>
      <YStack>
        <Input
          name="email"
          label="Email"
          placeholder="Podaj swój email"
          control={control}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          name="password"
          label="Hasło"
          placeholder="Podaj swoje hasło"
          control={control}
          keyboardType="default"
          autoCapitalize="none"
          secureTextEntry={hidePassword}
          suffixIcon={hidePassword ? <EyeClosedIcon /> : <EyeIcon />}
          suffixIconCallback={() => _setHidePassword(!hidePassword)}
          textContentType="oneTimeCode"
        />
      </YStack>
      <YStack gap="$4">
        <Button backgroundColor="$green8" onPress={handleSubmit(onSubmit)}>
          Zaloguj się
        </Button>
        <XStack gap="$2" justifyContent="center">
          <Text style={{ color: colors.text }}>Nie masz konta?</Text>
          <Pressable
            onPress={() => {
              router.replace('/(auth)/sign-up');
            }}>
            <Text style={{ color: colors.text }}>Zarejestruj się</Text>
          </Pressable>
        </XStack>
      </YStack>
      <ToastMessage />
    </YStack>
  );
};

export default SignInModal;
