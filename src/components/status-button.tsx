import React, { FC } from 'react';
import { Button, Text, useTheme } from 'tamagui';

import { Status } from '@/models/statuses';
import { getStatusIcon } from '@/utils/helpers';

type Props = {
  status: Status;
};

const StatusButton: FC<Props> = ({ status }) => {
  const theme = useTheme();

  return (
    <Button
      onPress={() => {}}
      style={{
        width: 'fit-content',
        height: 50,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.color4.val,
        borderWidth: 1.5,
        borderColor: theme.color10.val,
        top: 190,
        right: 10,
        position: 'absolute',
        zIndex: 1,
      }}
      icon={getStatusIcon(status.id)}>
      <Text fontSize={16}>{status.name}</Text>
    </Button>
  );
};

export default StatusButton;
