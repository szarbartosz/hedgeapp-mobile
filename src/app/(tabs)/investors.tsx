import { Image } from 'expo-image';
import { router } from 'expo-router';
import { FC } from 'react';
import { ImageRequireSource, SafeAreaView } from 'react-native';
import { Button, ListItem, ScrollView, Text, useTheme, View, YGroup, YStack } from 'tamagui';

import { useGetInvestorsQuery } from '@/api/investors.service';
import { ChevronRightIcon } from '@/assets/icons';

const InvestorsScreen: FC = () => {
  const theme = useTheme();

  const { data: investors, isSuccess } = useGetInvestorsQuery();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack flex={1} marginBottom="$8" marginTop="$3">
        {isSuccess && investors.length > 0 ? (
          <ScrollView>
            <YGroup borderRadius={0}>
              {investors.map(investor => (
                <YGroup.Item key={investor.id}>
                  <ListItem
                    onPress={() =>
                      router.navigate({
                        pathname: '/investors/details',
                        params: { id: investor.id },
                      })
                    }
                    hoverTheme
                    backgroundColor={theme.$color4}
                    borderBottomColor={theme.$color6}
                    borderBottomWidth={1}
                    title={investor.name}
                    subTitle={investor.contactPerson}
                    iconAfter={ChevronRightIcon}
                  />
                </YGroup.Item>
              ))}
            </YGroup>
          </ScrollView>
        ) : (
          <YGroup flex={1} justifyContent="center" alignItems="center" margin={24} gap="$4">
            <YGroup.Item>
              <Text fontWeight={800} textAlign="center">
                Brak zdefiniowanych inwestorów
              </Text>
              <Text textAlign="center">
                Nie posiadasz ani jednego zdefiniowanego inwestora. Utwórz profil nowego inwestora,
                który następnie zostanie wyświetlony na liście.
              </Text>
            </YGroup.Item>
            <YGroup.Item>
              <Image
                source={require('@/assets/images/empty-investors-list.png') as ImageRequireSource}
                style={{ width: 300, height: 300 }}
                contentFit="contain"
              />
            </YGroup.Item>
          </YGroup>
        )}
      </YStack>
      <View paddingHorizontal="$4" position="absolute" bottom="$4" width="100%">
        <Button
          backgroundColor={theme.$color12}
          color={theme.$color1}
          onPress={() => router.navigate('/investors/form')}>
          {`${isSuccess && investors.length > 0 ? 'Dodaj inwestora' : 'Zdefiniuj pierwszego inwestora'}`}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default InvestorsScreen;
