import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { H4, ScrollView, useTheme, YStack } from 'tamagui';

import { useGetStatusesQuery } from '@/api/statuses.service';
import { Status } from '@/models/statuses';

import StatusButton from '../status-button';

type Props = { title: string; currentStauts: Status; updateStatus: (statusId: number) => void };

const StatusSheet = forwardRef<BottomSheetModal, Props>(
  ({ title, currentStauts, updateStatus }, ref) => {
    const { data: statuses } = useGetStatusesQuery();

    const insets = useSafeAreaInsets();
    const theme = useTheme();

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      ),
      []
    );

    const handleUpdate = (id: number) => {
      updateStatus(id);
      (ref as React.RefObject<BottomSheetModal>).current?.dismiss();
    };

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={['70%']}
        handleIndicatorStyle={{ display: 'none' }}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        backgroundStyle={{
          backgroundColor: theme.color1.val,
        }}
        containerStyle={{ zIndex: 2 }}>
        <BottomSheetView
          style={{
            flexDirection: 'column',
            paddingHorizontal: 24,
            paddingBottom: Platform.OS === 'ios' ? (insets.bottom ? 60 : 40) : 40,
            rowGap: 24,
          }}>
          <H4 marginTop="$4">{title}</H4>
          <ScrollView showsVerticalScrollIndicator={false}>
            <YStack gap="$4" paddingBottom="$10">
              {statuses?.map(status => (
                <StatusButton
                  key={status.id}
                  status={status}
                  active={currentStauts.id === status.id}
                  onPress={() => handleUpdate(status.id)}
                />
              ))}
            </YStack>
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default StatusSheet;
