import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback } from 'react';
import { Platform, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = { date: string };

const DecisionDateSheet = forwardRef<BottomSheetModal, Props>(({ date }, ref) => {
  const insets = useSafeAreaInsets();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing={true}
      handleIndicatorStyle={{ display: 'none' }}
      backdropComponent={renderBackdrop}>
      <BottomSheetView
        style={{
          flexDirection: 'column',
          paddingHorizontal: 24,
          paddingTop: 12,
          paddingBottom: Platform.OS === 'ios' ? (insets.bottom ? 60 : 40) : 40,
          rowGap: 32,
        }}>
        <Text>{date}</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default DecisionDateSheet;
