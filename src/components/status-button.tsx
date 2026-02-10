import React, { FC } from 'react';
import { Button, Text, useTheme } from 'tamagui';

import { Status } from '@/models/statuses';

import StatusIcon from './status-icon';

type Props = {
  status: Status;
  onPress: () => void;
  active?: boolean;
};

const StatusButton: FC<Props> = ({ status, onPress }) => {
  const theme = useTheme();

  return (
    <Button
      onPress={onPress}
      height={50}
      borderRadius={8}
      justifyContent="flex-start"
      alignItems="center"
      backgroundColor={theme.color4.val}
      borderWidth={1.5}
      borderColor={theme.color8.val}
      pressStyle={{
        backgroundColor: theme.color6.val,
        borderColor: theme.color10.val,
      }}
      icon={<StatusIcon status={status.id} />}>
      <Text fontSize={16}>{status.name}</Text>
    </Button>
  );
};

export default StatusButton;
