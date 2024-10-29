import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useState } from 'react';
import { Platform, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, H4, useTheme, View } from 'tamagui';

import { formattedDate } from '@/utils/helpers';

type Props = { issueDate: string };

const IssueDateSheet = forwardRef<BottomSheetModal, Props>(({ issueDate }, ref) => {
  const [date, setDate] = useState<string>(issueDate);

  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing={true}
      handleIndicatorStyle={{ display: 'none' }}
      backdropComponent={renderBackdrop}
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
        <H4 marginTop="$4">Data złożenia wniosku</H4>
        <Calendar
          onDayPress={(day: { dateString: string }) => setDate(day.dateString)}
          markedDates={{
            [date]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
          disable
          disableAllTouchEventsForDisabledDays={true}
          renderHeader={(date: Date) => (
            <Text style={{ color: theme.color12.val }}>
              {formattedDate(date.toString(), 'MMMM YYYY')}
            </Text>
          )}
          enableSwipeMonths={true}
          selected={date}
          theme={{
            calendarBackground: theme.color1.val,
            selectedDayBackgroundColor: theme.green8.val,
            selectedDayTextColor: theme.color1.val,
            todayTextColor: theme.green8.val,
            arrowColor: theme.green8.val,
            dayTextColor: theme.color12.val,
            textDisabledColor: theme.color8.val,
          }}
        />
        <View gap="$4" marginVertical="$4">
          <Button
            backgroundColor={theme.$color12}
            borderColor={theme.$color12}
            color={theme.$color1}
            // TODO: handle updating the date on press
            onPress={() => {}}>
            Zapisz
          </Button>
          <Button
            backgroundColor={theme.$color1}
            color={theme.$color12}
            borderColor={theme.$color12}
            onPress={() => (ref as React.RefObject<BottomSheetModal>).current?.dismiss()}>
            Anuluj
          </Button>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default IssueDateSheet;
