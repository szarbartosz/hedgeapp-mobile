import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BuildingIcon, LandmarkIcon, UserIcon, UsersIcon } from '@/assets/icons';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          height: 58 + insets.bottom,
          paddingTop: 8,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Obiekty',
          tabBarIcon: ({ color }) => <BuildingIcon strokeColor={color} />,
        }}
      />
      <Tabs.Screen
        name="investors"
        options={{
          title: 'Inwestorzy',
          tabBarIcon: ({ color }) => <UsersIcon strokeColor={color} />,
        }}
      />
      <Tabs.Screen
        name="offices"
        options={{
          title: 'Urzędy',
          tabBarIcon: ({ color }) => <LandmarkIcon strokeColor={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <UserIcon strokeColor={color} />,
        }}
      />
    </Tabs>
  );
}
