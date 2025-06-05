/* eslint-disable @typescript-eslint/no-floating-promises */

import '@/styles/global.css';

import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { FontSource, useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { TamaguiProvider } from 'tamagui';

import ToastMessage from '@/components/toast-message';
import NAV_THEME from '@/constants/Colors';
import AuthProvider from '@/context/auth-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { store } from '@/redux/store';
import { tamaguiConfig } from '@/utils/tamagui.config';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf') as FontSource,
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf') as FontSource,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme || 'light'}>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
          <Stack.Screen name="auth" options={{ headerShown: false, animation: 'fade' }} />
        </Stack>
        <ToastMessage />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
