import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, useColorScheme } from 'react-native';

import { BuildingIcon, LandmarkIcon, UserIcon, UsersIcon } from '@/assets/icons';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 80,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 32 : 22,
          borderTopWidth: 2,
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
