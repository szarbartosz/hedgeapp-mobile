import { FC } from 'react';
import { Button, H4, Text, XGroup, YGroup } from 'tamagui';

import { formattedDate } from '@/utils/helpers';

type Props = {
  title: string;
  date: string;
  handlePress: () => void;
};

const DateCard: FC<Props> = ({ title, date, handlePress }) => (
  <XGroup
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    padding="$4"
    backgroundColor="$color2"
    borderWidth={1}
    borderColor="$color5"
    marginTop="$4">
    <XGroup.Item>
      <YGroup>
        <YGroup.Item>
          <H4 fontSize={16}>{formattedDate(date, 'D MMMM YYYY')}</H4>
        </YGroup.Item>
        <YGroup.Item>
          <Text color="$color11">{title}</Text>
        </YGroup.Item>
      </YGroup>
      <Button onPress={handlePress} borderRadius="$10">
        {date ? 'Edytuj' : 'Dodaj'}
      </Button>
    </XGroup.Item>
  </XGroup>
);

export default DateCard;
