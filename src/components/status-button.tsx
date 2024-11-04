import React, { FC } from 'react';
import { Button, Text, useTheme } from 'tamagui';

import { Status } from '@/models/statuses';

import StatusIcon from './status-icon';

type Props = {
  status: Status;
  onPress: () => void;
  active?: boolean;
};

const StatusButton: FC<Props> = ({ status, onPress, active }) => {
  const theme = useTheme();

  return (
    <Button
      onPress={onPress}
      style={{
        width: 'fit-content',
        height: 50,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: active ? theme.color8.val : theme.color4.val,
        borderWidth: 1.5,
        borderColor: active ? theme.color12.val : theme.color10.val,
      }}
      icon={<StatusIcon status={status.id} />}>
      <Text fontSize={16}>{status.name}</Text>
    </Button>
  );
};

export default StatusButton;
