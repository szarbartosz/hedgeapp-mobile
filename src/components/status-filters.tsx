import { Dispatch, FC } from 'react';
import { Button, ScrollView, Text, XGroup } from 'tamagui';

import { useGetStatusesQuery } from '@/api/statuses.service';
import { getStatusIcon } from '@/utils/helpers';

type Props = {
  selectedStatus: number;
  setSelectedStatus: Dispatch<React.SetStateAction<number>>;
};

const StatusFilters: FC<Props> = ({ selectedStatus, setSelectedStatus }) => {
  const { data: statuses } = useGetStatusesQuery();

  return (
    <ScrollView horizontal margin={24} showsHorizontalScrollIndicator={false}>
      <XGroup display="flex" gap={14}>
        {[{ id: 0, name: 'Wszystkie' }, ...(statuses || [])]?.map(status => (
          <XGroup.Item key={status.id}>
            <Button
              icon={status.id ? getStatusIcon(status.id) : undefined}
              onPress={() => setSelectedStatus(status.id)}
              style={{ borderRadius: 8 }}
              backgroundColor={selectedStatus === status.id ? '#245531' : '$color8'}
              h={44}
              display="flex"
              justifyContent="center"
              paddingHorizontal={12}>
              <Text color={selectedStatus === status.id ? '$color1' : '$color12'}>
                {status.name}
              </Text>
            </Button>
          </XGroup.Item>
        ))}
      </XGroup>
    </ScrollView>
  );
};

export default StatusFilters;
