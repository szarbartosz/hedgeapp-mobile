import { router } from 'expo-router';
import { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, ListItem, ScrollView, useTheme, View, YGroup, YStack } from 'tamagui';

import { useGetInvestorsQuery } from '@/api/investors.service';
import { ChevronRightIcon } from '@/assets/icons';

const InvestorsScreen: FC = () => {
  const theme = useTheme();

  const { data: investors, isSuccess } = useGetInvestorsQuery();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack flex={1} marginBottom="$8" marginTop="$3">
        <ScrollView>
          <YGroup borderRadius={0}>
            {isSuccess &&
              investors.map(investor => (
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
      </YStack>
      <View paddingHorizontal="$4" position="absolute" bottom="$4" width="100%">
        <Button
          backgroundColor={theme.$color12}
          color={theme.$color1}
          onPress={() => router.navigate('/investors/form')}>
          Dodaj inwestora
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default InvestorsScreen;
