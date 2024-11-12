import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { forwardRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, H4, ScrollView, useTheme, View, YStack } from 'tamagui';

import { useUpdateInvestmentMutation } from '@/api/investments.service';
import Input from '@/components/input';
import { UpdateApplicationRequest } from '@/models/investment';
import { Investment } from '@/types/data';
import { applicationValidationSchema } from '@/utils/schemas';

type Props = { investment: Investment };

const ApplicationSheet = forwardRef<BottomSheetModal, Props>(({ investment }, ref) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
    []
  );

  const [updateInvestment] = useUpdateInvestmentMutation();

  const getDefaultValues = () => ({
    signature: investment.application.signature || '',
    isCommercial: investment.application.isCommercial || '',
    deforestationCause: investment.application.deforestationCause || '',
    deforestationDate: investment.application.deforestationDate || '',
    plantingDate: investment.application.plantingDate || '',
    plantingSite: investment.application.plantingSite || '',
    species: investment.application.species || '',
  });

  const { control, handleSubmit } = useForm<UpdateApplicationRequest>({
    mode: 'onChange',
    defaultValues: getDefaultValues(),
    resolver: zodResolver(applicationValidationSchema),
  });

  const onSubmit = async (data: UpdateApplicationRequest) => {
    await updateInvestment({
      id: investment.id,
      data: { ...investment, application: { ...investment.application, ...data } },
    });

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
        <H4 marginTop="$4">Dane do winosku</H4>
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack paddingBottom="$10">
            <Input
              name="signature"
              label="Sygnatura sprawy"
              placeholder="Podaj sygnaturę"
              control={control}
            />
            <Input
              name="isCommercial"
              label="Wycinka komercyjna"
              placeholder="Wybierz opcję"
              control={control}
            />
            <Input
              name="deforestationCause"
              label="Przyczyna wycinki"
              placeholder="Podaj przyczynę wycinki"
              control={control}
              multiline={true}
            />
            <Input
              name="deforestationDate"
              label="Data przeprawdzenia wycinki"
              placeholder="Podaj datę wycinki"
              control={control}
            />
            <Input
              name="plantingDate"
              label="Termin wykonania nasadzeń zastępczych"
              placeholder="Podaj datę nasadzeń"
              control={control}
            />
            <Input
              name="plantingSite"
              label="Miejsce nasadzeń"
              placeholder="Podaj miejsce nasadzeń"
              control={control}
            />
            <Input
              name="species"
              label="Gatunki"
              placeholder="Podaj gatunki"
              control={control}
              autoCapitalize="none"
            />
            <View gap="$4" marginVertical="$4">
              <Button
                backgroundColor={theme.$color12}
                borderColor={theme.$color12}
                color={theme.$color1}
                onPress={handleSubmit(onSubmit)}>
                Zapisz
              </Button>
              <Button
                backgroundColor={theme.$color4}
                color={theme.$color12}
                borderColor={theme.$color12}
                onPress={() => (ref as React.RefObject<BottomSheetModal>).current?.dismiss()}>
                Anuluj
              </Button>
            </View>
          </YStack>
        </ScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default ApplicationSheet;
