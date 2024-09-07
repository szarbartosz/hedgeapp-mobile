import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImageRequireSource, Pressable } from 'react-native';
import { Button, H3, H4, ScrollView, Text, useTheme, XStack, YStack } from 'tamagui';

import { useSignInMutation } from '@/api/auth.service';
import { EyeClosedIcon } from '@/assets/icons/eye-closed-icon';
import { EyeIcon } from '@/assets/icons/eye-icon';
import Input from '@/components/input';
import { SignInRequest } from '@/models/auth';
import { signInValidationSchema } from '@/utils/schemas';

const SignInModal: FC = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [signIn] = useSignInMutation();
  const theme = useTheme();

  const { control, handleSubmit } = useForm<SignInRequest>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInValidationSchema),
  });

  const onSubmit = async (credentials: SignInRequest) => {
    const signInResult = await signIn({
      ...credentials,
    });

    if (signInResult?.data) {
      await SecureStore.setItemAsync('token', signInResult.data?.token || '');
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
            <H3 color="$color">Miło Cię widzieć!</H3>
            <H4 color="$color">Zaloguj się i korzystaj z aplikacji</H4>
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
          </YStack>
          <YStack gap="$4">
            <Button backgroundColor="$green8" onPress={handleSubmit(onSubmit)}>
              Zaloguj się
            </Button>
            <XStack gap="$2" justifyContent="center">
              <Text>Nie masz konta?</Text>
              <Pressable
                onPress={() => {
                  router.replace('/(auth)/sign-up');
                }}>
                <Text fontWeight={800}>Zarejestruj się</Text>
              </Pressable>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </>
  );
};

export default SignInModal;
