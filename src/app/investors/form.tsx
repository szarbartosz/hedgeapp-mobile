import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Button, H3, useTheme, View } from 'tamagui';

import {
  useCreateInvestorMutation,
  useGetSingleInvestorQuery,
  useUpdateInvestorMutation,
} from '@/api/investors.service';
import Input from '@/components/input';
import { AddInvestorRequest } from '@/models/investor';
import { investorValidationSchema } from '@/utils/schemas';

const AddOrUpdateInvestmentScreen: FC = () => {
  const { id: investorId } = useLocalSearchParams<{ id: string }>();

  const theme = useTheme();

  const { data: investor } = useGetSingleInvestorQuery(+investorId, { skip: !investorId });
  const [addInvestor] = useCreateInvestorMutation();
  const [updateInvestor] = useUpdateInvestorMutation();

  const getDefaultValues = () => {
    if (investorId) {
      return {
        name: investor?.name || '',
        contactPerson: investor?.contactPerson || '',
        phone: investor?.phone || '',
        email: investor?.email || '',
        nip: investor?.nip || '',
        regon: investor?.regon || '',
        address: {
          city: investor?.address.city || '',
          street: investor?.address.street || '',
          number: investor?.address.number || '',
          zipCode: investor?.address.zipCode || '',
        },
      };
    } else {
      return {
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
      };
    }
  };

  const { control, handleSubmit } = useForm<AddInvestorRequest>({
    mode: 'onChange',
    defaultValues: getDefaultValues(),
    resolver: zodResolver(investorValidationSchema),
  });

  const onSubmit = async (data: AddInvestorRequest) => {
    if (investorId) {
      const updateInvestorResult = await updateInvestor({ id: +investorId, data });

      if (updateInvestorResult.error) {
        Toast.show({
          type: 'error',
          props: {
            text1: 'Wystąpił błąd! 😳',
            text2: 'Edycja inwestora nie powiodła się',
          },
        });
      } else if (updateInvestorResult.data) {
        Toast.show({
          type: 'success',
          props: {
            text1: 'Sukces! 🎉',
            text2: 'Dane inwestora zostały pomyślnie zmodfikowane',
          },
        });
      }
    } else {
      const addInvestorResult = await addInvestor(data);

      if (addInvestorResult.error) {
        Toast.show({
          type: 'error',
          props: {
            text1: 'Wystąpił błąd! 😳',
            text2: 'Dodawanie inwestora nie powiodło się',
          },
        });
      } else if (addInvestorResult.data) {
        Toast.show({
          type: 'success',
          props: {
            text1: 'Sukces! 🎉',
            text2: 'Inwestor został pomyślnie dodany',
          },
        });
      }
    }
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        bottomOffset={20}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 16 }}>
        <H3 paddingVertical="$4">
          {investorId ? 'Edytuj dane inwestora' : 'Dodaj nowego inwestora'}
        </H3>
        <Input
          name="name"
          label="Nazwa inwestora"
          placeholder="Podaj nazwę inwestora"
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddOrUpdateInvestmentScreen;
