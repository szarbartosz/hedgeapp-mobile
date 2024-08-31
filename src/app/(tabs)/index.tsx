import { router } from 'expo-router';
import { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ListItem, ScrollView, useTheme, View, YGroup, YStack } from 'tamagui';

import { useGetInvestmentsQuery } from '@/api/investments.service';

import DeadlineCountdown from '../../components/deadline-countdown';

const InvestmentsScreen: FC = () => {
  const theme = useTheme();

  const { data: investments, isSuccess } = useGetInvestmentsQuery();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack flex={1} marginBottom="$8" marginTop="$3">
        <ScrollView>
          <YGroup borderRadius={0}>
            {isSuccess &&
              investments.map(investment => (
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
                    iconAfter={
                      <DeadlineCountdown
                        dates={[
                          ...(!investment.inspectionDone ? [investment.inspectionDate] : []),
                          ...(!investment.deforestationDone ? [investment.deforestationDate] : []),
                          ...(!investment.plantingDone ? [investment.plantingDate] : []),
                        ]}
                      />
                    }
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
          onPress={() => router.navigate('/investments/add')}>
          Dodaj inwestycję
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default InvestmentsScreen;
