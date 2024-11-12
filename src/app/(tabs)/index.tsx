import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { FC, useEffect, useState } from 'react';
import { ImageRequireSource } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ListItem, ScrollView, Text, useTheme, View, YGroup, YStack } from 'tamagui';

import { useGetCurrentUserQuery } from '@/api/core.service';
import { useGetInvestmentsQuery } from '@/api/investments.service';
import LoadingWrapper from '@/components/loading-wrapper';
import StatusFilters from '@/components/status-filters';
import StatusIcon from '@/components/status-icon';
import { calculateDaysLeft } from '@/utils/helpers';

import DeadlineCountdown from '../../components/deadline-countdown';

const InvestmentsScreen: FC = () => {
  const theme = useTheme();
  const [selectedStatus, setSelectedStatus] = useState<number>(0);

  const { data: user } = useGetCurrentUserQuery();
  const {
    data: investments,
    isSuccess,
    isLoading,
    refetch: refetchInvestments,
  } = useGetInvestmentsQuery();

  useEffect(() => {
    void (async () => {
      if (user) {
        await refetchInvestments();
      }
    })();
  }, [user]);

  useEffect(() => {
    void (async () => {
      await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingWrapper isLoading={isLoading}>
        <YStack flex={1} marginBottom="$8" marginTop="$3">
          {isSuccess && investments.length > 0 ? (
            <ScrollView>
              <StatusFilters
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
              <YGroup borderRadius={0}>
                {investments
                  .filter(investment => {
                    if (selectedStatus === 0) return true;
                    return investment.status.id === selectedStatus;
                  })
                  .sort((a, b) => {
                    const aDaysLeft = calculateDaysLeft([
                      ...(!a.inspectionDone ? [a.inspectionDate] : []),
                      ...(!a.deforestationDone ? [a.deforestationDate] : []),
                      ...(!a.plantingDone ? [a.plantingDate] : []),
                    ]);
                    const bDaysLeft = calculateDaysLeft([
                      ...(!b.inspectionDone ? [b.inspectionDate] : []),
                      ...(!b.deforestationDone ? [b.deforestationDate] : []),
                      ...(!b.plantingDone ? [b.plantingDate] : []),
                    ]);
                    if (aDaysLeft === bDaysLeft) return 0;
                    return aDaysLeft < bDaysLeft ? -1 : 1;
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
                        icon={
                          <StatusIcon
                            status={investment.status.id}
                            strokeColor={theme.color11.val}
                          />
                        }
                        iconAfter={
                          <DeadlineCountdown
                            dates={[
                              ...(!investment.inspectionDone ? [investment.inspectionDate] : []),
                              ...(!investment.deforestationDone
                                ? [investment.deforestationDate]
                                : []),
                              ...(!investment.plantingDone ? [investment.plantingDate] : []),
                            ].filter(date => date)}
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
                  source={
                    require('@/assets/images/empty-investments-list.png') as ImageRequireSource
                  }
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
      </LoadingWrapper>
    </SafeAreaView>
  );
};

export default InvestmentsScreen;
