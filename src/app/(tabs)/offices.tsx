import { Image } from 'expo-image';
import { router } from 'expo-router';
import { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H3, ListItem, ScrollView, YGroup, YStack } from 'tamagui';

import { useGetOfficesQuery } from '@/api/offices.service';
import { ChevronRightIcon } from '@/assets/icons';
import LoadingWrapper from '@/components/loading-wrapper';
import { getOfficeLogo } from '@/utils/helpers';

const OfficesScreen: FC = () => {
  const { data: offices, isSuccess, isLoading } = useGetOfficesQuery();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <LoadingWrapper isLoading={isLoading}>
        <H3 paddingHorizontal="$4" paddingTop="$3">
          Urzędy
        </H3>
        <YStack flex={1} marginBottom="$8">
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
                      backgroundColor="$color3"
                      borderBottomColor="$color5"
                      borderBottomWidth={1}
                      title={`${office.address.city} - ${office.name}`}
                      subTitle={`${office.address.street} ${office.address.number}`}
                      iconAfter={ChevronRightIcon}
                      icon={
                        <Image
                          source={getOfficeLogo(office.address.city)}
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
      </LoadingWrapper>
    </SafeAreaView>
  );
};

export default OfficesScreen;
