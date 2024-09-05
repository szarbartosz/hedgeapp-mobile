import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, H3, ScrollView, useTheme, View } from 'tamagui';

import { useCreateInvestorMutation } from '@/api/investors.service';
import Input from '@/components/input';
import { AddInvestorRequest } from '@/models/investor';
import { investorValidationSchema } from '@/utils/schemas';

const AddInvestmentScreen: FC = () => {
  const theme = useTheme();
  const [addInvestor] = useCreateInvestorMutation();

  const { control, handleSubmit } = useForm<AddInvestorRequest>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      nip: '',
      regon: '',
      address: {
        city: '',
        street: '',
        number: '',
        zipCode: '',
      },
    },
    resolver: zodResolver(investorValidationSchema),
  });

  const onSubmit = async (data: AddInvestorRequest) => {
    await addInvestor(data);
    router.replace('/investors');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} paddingHorizontal="$4">
        <H3 paddingVertical="$4">Dodaj nowego inwestora</H3>
        <Input
          name="name"
          label="Nazwa obiektu"
          placeholder="Podaj nazwę obiektu"
          control={control}
          autoCapitalize="sentences"
        />
        <Input
          name="contactPerson"
          label="Osoba kontaktowa"
          placeholder="Podaj imię i nazwisko osoby kontaktowej"
          control={control}
          autoCapitalize="words"
        />
        <Input
          name="email"
          label="Email"
          placeholder="Podaj email inwestora"
          control={control}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          name="phone"
          label="Telefon"
          placeholder="Podaj numer telefonu inwestora"
          control={control}
          keyboardType="phone-pad"
        />
        <Input
          name="nip"
          label="NIP"
          placeholder="Podaj numer NIP inwestora"
          control={control}
          keyboardType="phone-pad"
        />
        <Input
          name="regon"
          label="REGON"
          placeholder="Podaj numer REGON inwestora"
          control={control}
          keyboardType="phone-pad"
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

export default AddInvestmentScreen;
