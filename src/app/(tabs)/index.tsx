import { router } from 'expo-router';
import { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ListItem, ScrollView, useTheme, View, YGroup, YStack } from 'tamagui';

import { investments } from '@/utils/data';

import DeadlineCountdown from '../../components/deadline-countdown';

const InvestmentsScreen: FC = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack flex={1} marginBottom="$8">
        <ScrollView>
          <YGroup bordered borderRadius={0}>
            {investments.map(investment => (
              <YGroup.Item key={investment.id}>
                <ListItem
                  hoverTheme
                  bordered
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
