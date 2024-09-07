import { Image } from 'expo-image';
import { router } from 'expo-router';
import { FC, useState } from 'react';
import { ImageRequireSource } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ListItem, ScrollView, Text, useTheme, View, YGroup, YStack } from 'tamagui';

import { useGetInvestmentsQuery } from '@/api/investments.service';
import StatusFilters from '@/components/status-filters';
import { getStatusIcon } from '@/utils/helpers';

import DeadlineCountdown from '../../components/deadline-countdown';

const InvestmentsScreen: FC = () => {
  const theme = useTheme();
  const [selectedStatus, setSelectedStatus] = useState<number>(0);

  const { data: investments, isSuccess } = useGetInvestmentsQuery();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack flex={1} marginBottom="$8" marginTop="$3">
        {isSuccess && investments.length > 0 ? (
          <ScrollView>
            <StatusFilters selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
            <YGroup borderRadius={0}>
              {investments
                .filter(investment => {
                  if (selectedStatus === 0) return true;
                  return investment.status.id === selectedStatus;
                })
                .map(investment => (
                  <YGroup.Item key={investment.id}>
                    <ListItem
                      onPress={() =>
                        router.navigate({
                          pathname: '/investments/details',
                          params: { id: investment.id },
                        })
                      }
                      hoverTheme
                      backgroundColor={theme.$color4}
                      borderBottomColor={theme.$color6}
                      borderBottomWidth={1}
                      title={investment.name}
                      subTitle={investment.investor.name}
                      icon={getStatusIcon(investment.status.id)}
                      iconAfter={
                        <DeadlineCountdown
                          dates={[
                            ...(!investment.inspectionDone ? [investment.inspectionDate] : []),
                            ...(!investment.deforestationDone
                              ? [investment.deforestationDate]
                              : []),
                            ...(!investment.plantingDone ? [investment.plantingDate] : []),
                          ]}
                        />
                      }
                    />
                  </YGroup.Item>
                ))}
            </YGroup>
          </ScrollView>
        ) : (
          <YGroup flex={1} justifyContent="center" alignItems="center" margin={24} gap="$4">
            <YGroup.Item>
              <Text fontWeight={800} textAlign="center">
                Brak zdefiniowanych inwestycji
              </Text>
              <Text textAlign="center">
                Nie posiadasz ani jednej zdefiniowanej inwestycji. Utwórz nowy obiekt, który
                następnie zostanie wyświetlony na liście.
              </Text>
            </YGroup.Item>
            <YGroup.Item>
              <Image
                source={require('@/assets/images/empty-investments-list.png') as ImageRequireSource}
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
          onPress={() => router.navigate('/investments/form')}>
          {`${isSuccess && investments.length > 0 ? 'Dodaj obiekt' : 'Zdefiniuj pierwszą inwestycję'}`}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default InvestmentsScreen;
