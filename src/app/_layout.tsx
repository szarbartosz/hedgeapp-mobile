/* eslint-disable @typescript-eslint/no-floating-promises */

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { TamaguiProvider } from 'tamagui';

import SpaceMono from '@/assets/fonts/SpaceMono-Regular.ttf';
import AuthProvider from '@/context/auth-context';
import { store } from '@/redux/store';
import { tamaguiConfig } from '@/utils/tamagui.config';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono,
    ...FontAwesome.font,
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
  const colorScheme = useColorScheme();

  const LightTheme = {
    dark: false,
    colors: {
      primary: 'rgb(0, 122, 255)',
      background: '#F0F0F0',
      card: '#F0F0F0',
      text: 'rgb(28, 28, 30)',
      border: '#E6E6E6',
      notification: 'rgb(255, 59, 48)',
    },
  };

  const DarkTheme = {
    dark: true,
    colors: {
      primary: 'rgb(10, 132, 255)',
      background: '#232323',
      card: '#232323',
      text: 'rgb(229, 229, 231)',
      border: '#323232',
      notification: 'rgb(255, 69, 58)',
    },
  };

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme || 'light'}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : LightTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ presentation: 'modal', headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
