/* eslint-disable @typescript-eslint/no-floating-promises */

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { PortalProvider } from '@tamagui/portal';
import { FontSource, useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Provider } from 'react-redux';
import { TamaguiProvider } from 'tamagui';

import ToastMessage from '@/components/toast-message';
import AuthProvider from '@/context/auth-context';
import { store } from '@/redux/store';

import { tamaguiConfig } from '../../tamagui.config';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf') as FontSource,
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf') as FontSource,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <KeyboardProvider>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme || 'light'}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <PortalProvider shouldAddRootHost>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
              <Stack.Screen name="auth" options={{ headerShown: false, animation: 'fade' }} />
            </Stack>
            <ToastMessage />
          </PortalProvider>
        </ThemeProvider>
      </TamaguiProvider>
    </KeyboardProvider>
  );
}
