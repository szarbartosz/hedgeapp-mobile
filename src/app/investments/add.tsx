import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, H3, ScrollView, useTheme, View } from 'tamagui';

import { useCreateInvestmentMutation } from '@/api/investments.service';
import { useGetInvestorsQuery } from '@/api/investors.service';
import { useGetOfficesQuery } from '@/api/offices.service';
import { useGetStatusesQuery } from '@/api/statuses.service';
import Input from '@/components/input';
import Select from '@/components/select';
import { AddInvestmentRequest } from '@/models/investment';
import { investmentValidationSchema } from '@/utils/schemas';

const AddInvestmentScreen: FC = () => {
  const theme = useTheme();
  const { data: investors } = useGetInvestorsQuery();
  const { data: statuses } = useGetStatusesQuery();
  const { data: offices } = useGetOfficesQuery();
  const [addInvestment] = useCreateInvestmentMutation();

  const { control, handleSubmit } = useForm<AddInvestmentRequest>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      investorId: undefined,
      statusId: undefined,
      officeId: undefined,
      city: '',
      street: '',
      number: '',
    },
    resolver: zodResolver(investmentValidationSchema),
  });

  const onSubmit = async (data: AddInvestmentRequest) => {
    await addInvestment(data);
    router.replace('/');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} paddingHorizontal="$4">
        <H3 paddingVertical="$4">Dodaj nowy obiekt</H3>
        <Input
          name="name"
          label="Nazwa obiektu"
          placeholder="Podaj nazwę obiektu"
          control={control}
          autoCapitalize="sentences"
        />
        <Select
          name="investorId"
          label="Wybierz inwestora"
          placeholder="Wybierz inwestora"
          control={control}
          items={investors?.map(investor => ({ id: investor.id, label: investor.name })) || []}
        />
        <Select
          name="statusId"
          label="Wybierz status"
          placeholder="Wybierz status"
          control={control}
          items={statuses?.map(status => ({ id: status.id, label: status.name })) || []}
        />
        <Select
          name="officeId"
          label="Wybierz urząd"
          placeholder="Wybierz urząd"
          control={control}
          items={offices?.map(office => ({ id: office.id, label: office.name })) || []}
        />
        <Input
          name="city"
          label="Miasto"
          placeholder="Podaj nazwę miasta"
          control={control}
          autoCapitalize="words"
        />
        <Input name="street" label="Ulica" placeholder="Podaj nazwę ulicy" control={control} />
        <Input name="number" label="Numer" placeholder="Podaj numer obiektu" control={control} />
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
            onPress={() => router.back()}>
            Anuluj
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddInvestmentScreen;
