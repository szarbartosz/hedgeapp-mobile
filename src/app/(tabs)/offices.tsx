import { Image } from 'expo-image';
import { router } from 'expo-router';
import { FC } from 'react';
import { ImageRequireSource } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListItem, ScrollView, useTheme, YGroup, YStack } from 'tamagui';

import { useGetOfficesQuery } from '@/api/offices.service';
import { ChevronRightIcon } from '@/assets/icons';

const OfficesScreen: FC = () => {
  const theme = useTheme();

  const { data: offices, isSuccess } = useGetOfficesQuery();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack flex={1} marginBottom="$8" marginTop="$3">
        <ScrollView>
          <YGroup borderRadius={0}>
            {isSuccess &&
              offices.map(office => (
                <YGroup.Item key={office.id}>
                  <ListItem
                    onPress={() =>
                      router.navigate({
                        pathname: '/offices/details',
                        params: { id: office.id },
                      })
                    }
                    hoverTheme
                    backgroundColor={theme.$color4}
                    borderBottomColor={theme.$color6}
                    borderBottomWidth={1}
                    title={office.name}
                    subTitle={`${office.address.street} ${office.address.number}`}
                    iconAfter={ChevronRightIcon}
                    icon={
                      <Image
                        source={
                          require('@/assets/images/office-logos/krakow.png') as ImageRequireSource
                        }
                        style={{ width: 50, height: 50 }}
                        contentFit="contain"
                      />
                    }
                  />
                </YGroup.Item>
              ))}
          </YGroup>
        </ScrollView>
      </YStack>
    </SafeAreaView>
  );
};

export default OfficesScreen;
