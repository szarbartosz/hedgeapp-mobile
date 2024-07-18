import { FC } from 'react';
import { Button, H4, YStack } from 'tamagui';

import { useAuth } from '@/context/auth-context';

const InvestorsScreen: FC = () => {
  const { signOut } = useAuth();

  return (
    <YStack justifyContent="center" flexGrow={1}>
      <H4 alignSelf="center" color="$color">
        Inwestorzy
      </H4>
      <Button onPress={signOut}>Wyloguj się</Button>
    </YStack>
  );
};

export default InvestorsScreen;
