import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImageRequireSource, Pressable } from 'react-native';
import { Button, H3, H4, ScrollView, Text, useTheme, XStack, YStack } from 'tamagui';

import { useSignUpMutation } from '@/api/auth.service';
import { EyeClosedIcon } from '@/assets/icons/eye-closed-icon';
import { EyeIcon } from '@/assets/icons/eye-icon';
import Input from '@/components/input';
import { SignUpRequest } from '@/models/auth';
import { signUpValidationSchema } from '@/utils/schemas';

const SignUpScreen: FC = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [signUp] = useSignUpMutation();
  const theme = useTheme();

  const { control, handleSubmit } = useForm<SignUpRequest>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    resolver: zodResolver(signUpValidationSchema),
  });

  const onSubmit = async (credentials: SignUpRequest) => {
    const signUpResult = await signUp({
      ...credentials,
    });

    if (signUpResult?.data) {
      await SecureStore.setItemAsync('token', signUpResult.data?.token || '');
      router.navigate('/(tabs)/');
    }
  };

  return (
    <>
      <Image
        source={require('@/assets/images/auth-cover.png') as ImageRequireSource}
        style={{ width: '100%', height: 300 }}
      />
      <ScrollView>
        <YStack marginHorizontal={24} gap="$4" marginBottom={64}>
          <YStack marginTop={30}>
            <H3 color="$color">Miło Cię poznać!</H3>
            <H4 color="$color">Zarejestruj się i korzystaj z aplikacji</H4>
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
              placeholder="Podaj hasło"
              control={control}
              keyboardType="default"
              autoCapitalize="none"
              secureTextEntry={hidePassword}
              suffixIcon={
                hidePassword ? (
                  <EyeClosedIcon strokeColor={theme.color12.val} />
                ) : (
                  <EyeIcon strokeColor={theme.color12.val} />
                )
              }
              suffixIconCallback={() => setHidePassword(!hidePassword)}
              textContentType="oneTimeCode"
            />
            <Input
              name="confirmPassword"
              label="Powtórz hasło"
              placeholder="Powtórz hasło"
              control={control}
              keyboardType="default"
              autoCapitalize="none"
              secureTextEntry={hidePassword}
              suffixIcon={
                hidePassword ? (
                  <EyeClosedIcon strokeColor={theme.color12.val} />
                ) : (
                  <EyeIcon strokeColor={theme.color12.val} />
                )
              }
              suffixIconCallback={() => setHidePassword(!hidePassword)}
              textContentType="oneTimeCode"
            />
            <Input
              name="firstName"
              label="Imię"
              placeholder="Podaj swoje imię"
              control={control}
              autoCapitalize="words"
            />
            <Input
              name="lastName"
              label="Nazwisko"
              placeholder="Podaj swoje nazwisko"
              control={control}
              autoCapitalize="words"
            />
          </YStack>
          <YStack gap="$4">
            <Button backgroundColor="$green8" onPress={handleSubmit(onSubmit)}>
              Zarejestruj się
            </Button>
            <XStack gap="$2" justifyContent="center">
              <Text>Masz już konto?</Text>
              <Pressable
                onPress={() => {
                  router.replace('/(auth)/sign-in');
                }}>
                <Text fontWeight={800}>Zaloguj się</Text>
              </Pressable>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </>
  );
};

export default SignUpScreen;
