import { Tabs } from 'expo-router';
import React from 'react';

import { BuildingIcon, UserIcon, UsersIcon } from '@/assets/icons';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
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
          tabBarIcon: ({ color }) => <UsersIcon strokeColor={color} />,
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
