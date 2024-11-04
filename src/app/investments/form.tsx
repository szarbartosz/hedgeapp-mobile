import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, H3, ScrollView, useTheme, View } from 'tamagui';

import {
  useCreateInvestmentMutation,
  useGetSingleInvestmentQuery,
  useUpdateInvestmentMutation,
} from '@/api/investments.service';
import { useGetInvestorsQuery } from '@/api/investors.service';
import { useGetOfficesQuery } from '@/api/offices.service';
import { useGetStatusesQuery } from '@/api/statuses.service';
import Input from '@/components/input';
import Select from '@/components/select';
import { AddInvestmentRequest } from '@/models/investment';
import { investmentValidationSchema } from '@/utils/schemas';

const AddOrUpdateInvestmentScreen: FC = () => {
  const { id: investmentId } = useLocalSearchParams<{ id: string }>();

  const theme = useTheme();

  const { data: investors } = useGetInvestorsQuery();
  const { data: statuses } = useGetStatusesQuery();
  const { data: offices } = useGetOfficesQuery();
  const { data: investment } = useGetSingleInvestmentQuery(+investmentId, { skip: !investmentId });
  const [addInvestment] = useCreateInvestmentMutation();
  const [updateInvestment] = useUpdateInvestmentMutation();

  const getDefaultValues = () => {
    if (investmentId) {
      return {
        name: investment?.name || '',
        investorId: investment?.investor?.id || undefined,
        statusId: investment?.status?.id || undefined,
        officeId: investment?.office?.id || undefined,
        address: {
          city: investment?.address.city || '',
          street: investment?.address.street || '',
          number: investment?.address.number || '',
          zipCode: investment?.address.zipCode || '',
        },
      };
    } else {
      return {
        name: '',
        investorId: undefined,
        statusId: undefined,
        officeId: undefined,
        address: {
          city: '',
          street: '',
          number: '',
          zipCode: '',
        },
      };
    }
  };

  const { control, handleSubmit } = useForm<AddInvestmentRequest>({
    mode: 'onChange',
    defaultValues: getDefaultValues(),
    resolver: zodResolver(investmentValidationSchema),
  });

  const onSubmit = async (data: AddInvestmentRequest) => {
    if (investmentId) {
      await updateInvestment({ id: +investmentId, data: { ...investment, ...data } });
    } else {
      await addInvestment(data);
    }
    router.replace('/');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} paddingHorizontal="$4">
        <H3 paddingVertical="$4">{investmentId ? 'Edytuj dane obiektu' : 'Dodaj nowy obiekt'}</H3>
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
          name="address.city"
          label="Miasto"
          placeholder="Podaj nazwę miasta"
          control={control}
          autoCapitalize="words"
        />
        <Input
          name="address.street"
          label="Ulica"
          placeholder="Podaj nazwę ulicy"
          control={control}
        />
        <Input
          name="address.number"
          label="Numer"
          placeholder="Podaj numer obiektu"
          control={control}
        />
        <Input
          name="address.zipCode"
          label="Kod pocztowy"
          placeholder="Podaj kod pocztowy"
          control={control}
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
            onPress={() => router.back()}>
            Anuluj
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddOrUpdateInvestmentScreen;
