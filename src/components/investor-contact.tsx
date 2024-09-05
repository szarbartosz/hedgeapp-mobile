import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { FC } from 'react';
import { Platform } from 'react-native';
import { Button, Text, useTheme, View } from 'tamagui';

import { HardHatIcon, MailIcon, PhoneIcon } from '@/assets/icons';
import { Investor } from '@/types/data';

type Props = {
  investor: Investor;
  variant?: 'default' | 'simplified';
};

const InvestorContact: FC<Props> = ({ investor, variant = 'default' }) => {
  const theme = useTheme();

  const handlePhoneLinking = async () => {
    if (!investor.phone) return;

    Platform.OS === 'android'
      ? await Linking.openURL(`tel:${investor.phone}`)
      : await Linking.openURL(`telprompt:${investor.phone}`);
  };

  const handleMailLinking = async () => {
    if (!investor.email) return;

    await Linking.openURL(`mailto:${investor.email}`);
  };

  return (
    <View
      backgroundColor="$color1"
      flex={1}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      borderRadius={10}
      borderWidth={1}
      borderColor="$color5"
      paddingVertical="$4"
      paddingHorizontal="$3"
      marginTop="$4">
      {variant === 'default' ? (
        <Button
          display="flex"
          width="45%"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          backgroundColor={theme.$color1}
          gap={2}
          onPress={() =>
            router.navigate({
              pathname: '/investors/details',
              params: { id: investor.id },
            })
          }>
          <HardHatIcon strokeColor={theme.color12.val} />
          <View gap={4}>
            <Text maxWidth={110} numberOfLines={1} fontSize={16}>
              {investor.name}
            </Text>
            <Text maxWidth={110} numberOfLines={1} color={theme.color11} fontSize={14}>
              {investor.contactPerson}
            </Text>
          </View>
        </Button>
      ) : (
        <Button
          display="flex"
          width="45%"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          backgroundColor={theme.$color1}
          gap={2}
          onPress={handleMailLinking}>
          <MailIcon strokeColor={theme.color12.val} />
          <Text fontSize={15}>Wyślij mail</Text>
        </Button>
      )}
      <View display="flex" height={46} borderWidth={0.5} borderColor={theme.color11.val}></View>
      <Button
        display="flex"
        width="45%"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        backgroundColor={theme.$color1}
        gap={2}
        onPress={handlePhoneLinking}>
        <PhoneIcon strokeColor={theme.color12.val} />
        <Text fontSize={15}>Zadzwoń</Text>
      </Button>
    </View>
  );
};

export default InvestorContact;
