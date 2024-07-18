import { FC } from 'react';
import { H4, YStack } from 'tamagui';

const InvestmentsScreen: FC = () => (
  <YStack justifyContent="center" flexGrow={1}>
    <H4 alignSelf="center" color="$color">
      Inwestycje
    </H4>
  </YStack>
);

export default InvestmentsScreen;
