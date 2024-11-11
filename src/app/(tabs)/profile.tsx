import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import { ImageRequireSource } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H3, H4, ListItem, ScrollView, Text, useTheme, View, YGroup } from 'tamagui';

import { useGetCurrentUserQuery } from '@/api/core.service';
import { ChevronRightIcon } from '@/assets/icons';
import { useAuth } from '@/context/auth-context';

const ProfileScreen = () => {
  const theme = useTheme();

  const { signOut } = useAuth();
  const { data: user } = useGetCurrentUserQuery();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} paddingHorizontal="$4">
        <H3>{user?.firstName ? `Witaj, ${user?.firstName}!` : 'Witaj!'}</H3>

        <View
          backgroundColor="$color1"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          borderRadius={10}
          borderWidth={1}
          borderColor="$color5"
          paddingVertical="$4"
          paddingHorizontal="$3"
          marginTop="$4">
          <View>
            <Text>Twoje inwestycje</Text>
            <Text color="$color10">w jednym miejscu</Text>
          </View>
          <Image
            source={require('@/assets/images/hedgehog.png') as ImageRequireSource}
            style={{ width: 120, height: 120, position: 'absolute', right: 20, bottom: -10 }}
            contentFit="contain"
          />
        </View>

        <H4 marginTop="$4">Twoje dane</H4>
        <View paddingHorizontal="$2" gap={8}>
          {user?.firstName && (
            <Text color={theme.color12}>{`${user.firstName} ${user?.lastName}`}</Text>
          )}
          <Text color={theme.color12}>{user?.email}</Text>
        </View>

        <YGroup borderRadius={0} paddingTop="$8">
          <YGroup.Item>
            <ListItem
              onPress={() => Linking.openSettings()}
              hoverTheme
              backgroundColor={theme.$color4}
              borderBottomColor={theme.$color6}
              borderBottomWidth={1}
              title="Ustawienia powiadomień"
              iconAfter={ChevronRightIcon}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              // TODO: add password change functionality
              onPress={() => {}}
              hoverTheme
              backgroundColor={theme.$color4}
              borderBottomColor={theme.$color6}
              borderBottomWidth={1}
              title="Zmiana hasła"
              iconAfter={ChevronRightIcon}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              onPress={signOut}
              hoverTheme
              backgroundColor={theme.$color4}
              borderBottomColor={theme.$color6}
              borderBottomWidth={1}
              title="Wyloguj się"
              iconAfter={ChevronRightIcon}
            />
          </YGroup.Item>
        </YGroup>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
