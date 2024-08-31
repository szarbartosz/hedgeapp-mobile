import { FC } from 'react';
import { Button, Text, XGroup } from 'tamagui';

import DeadlineCountdown from './deadline-countdown';

type Props = {
  title: string;
  date: string;
  isDone: boolean;
  handleConfirmation: () => void;
  handleWithdrawal: () => void;
};

const DateIndicator: FC<Props> = ({
  title,
  date,
  isDone,
  handleConfirmation,
  handleWithdrawal,
}) => {
  const handleToggle = () => {
    isDone ? handleWithdrawal() : handleConfirmation();
  };

  return (
    <>
      <Text margin="$2" marginTop="$4">
        {title}
      </Text>
      {date ? (
        <XGroup backgroundColor="$color2">
          <XGroup.Item>
            <Button
              backgroundColor="$color1"
              width="50%"
              size="$4"
              borderWidth={1}
              borderRightWidth={0.5}
              borderColor="$color5"
              disabled
              chromeless>
              {isDone ? (
                <Text fontWeight={800}>wykonano</Text>
              ) : (
                <DeadlineCountdown dates={[date]} fontWeight={800} />
              )}
            </Button>
          </XGroup.Item>

          <XGroup.Item>
            <Button
              onPress={handleToggle}
              backgroundColor="$color1"
              width="50%"
              size="$4"
              borderWidth={1}
              borderLeftWidth={0.5}
              borderColor="$color5"
              chromeless>
              {isDone ? 'cofnij potwierdzenie' : 'potwierdź wykonanie'}
            </Button>
          </XGroup.Item>
        </XGroup>
      ) : (
        <XGroup backgroundColor="$color2">
          <XGroup.Item>
            <Button
              backgroundColor="$color1"
              width="100%"
              borderWidth={1}
              borderColor="$color5"
              chromeless
              disabled>
              nie sprecyzowano
            </Button>
          </XGroup.Item>
        </XGroup>
      )}
    </>
  );
};

export default DateIndicator;
