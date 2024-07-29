import { FC } from 'react';
import { Text, useTheme, View } from 'tamagui';

import { HardHatIcon, PhoneIcon } from '@/assets/icons';
import { Investor } from '@/types/data';

type Props = {
  investor: Investor;
};

const InvestorContact: FC<Props> = ({ investor }) => {
  const theme = useTheme();

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
      <View
        display="flex"
        width="50%"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={12}>
        <HardHatIcon strokeColor={theme.color12.val} />
        <View gap={4}>
          <Text maxWidth={110} numberOfLines={1} fontSize={16}>
            {investor.name}
          </Text>
          <Text maxWidth={110} numberOfLines={1} color={theme.color11} fontSize={14}>
            {investor.contactPerson}
          </Text>
        </View>
      </View>
      <View display="flex" height={46} borderWidth={0.5} borderColor={theme.color11.val}></View>
      <View
        display="flex"
        width="50%"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={12}>
        <PhoneIcon strokeColor={theme.color12.val} />
        <Text fontSize={15}>Zadzwoń</Text>
      </View>
    </View>
  );
};

export default InvestorContact;
