import { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListItem, ScrollView, YGroup, YStack } from 'tamagui';

import { investments } from '@/utils/data';

import DeadlineCountdown from '../components/deadline-countdown';

const InvestmentsScreen: FC = () => (
  <SafeAreaView>
    <YStack justifyContent="center" flexGrow={1}>
      <ScrollView>
        <YGroup alignSelf="center" bordered size="$4">
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
  </SafeAreaView>
);

export default InvestmentsScreen;
