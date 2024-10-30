import { FC, useEffect, useState } from 'react';
import { Text, useTheme } from 'tamagui';

import { calculateDaysLeft } from '@/utils/helpers';

type Props = {
  dates: string[];
  fontWeight?: 100 | 200 | 300 | 400 | 600 | 700 | 800 | 900 | 'unset';
};

const DeadlineCountdown: FC<Props> = ({ dates, fontWeight }) => {
  const [daysLeft, setDaysLeft] = useState<number>();

  const theme = useTheme();

  useEffect(() => {
    const minDaysLeft = calculateDaysLeft(dates);

    if (minDaysLeft !== Number.MAX_SAFE_INTEGER) {
      setDaysLeft(minDaysLeft);
    }
  }, [dates]);

  return daysLeft !== undefined ? (
    <Text
      fontWeight={fontWeight}
      color={
        daysLeft > 90
          ? theme.green10
          : daysLeft > 60
            ? theme.yellow10
            : daysLeft > 30
              ? theme.orange10
              : daysLeft > 10
                ? theme.red10
                : theme.purple10
      }>
      {daysLeft > 1
        ? `${daysLeft} dni`
        : daysLeft === 1
          ? `${daysLeft} dzień`
          : daysLeft === 0
            ? 'Dzisiaj!'
            : daysLeft === -1
              ? `${Math.abs(daysLeft)} dzień po terminie!`
              : `${Math.abs(daysLeft)} dni po terminie!`}
    </Text>
  ) : null;
};

export default DeadlineCountdown;
