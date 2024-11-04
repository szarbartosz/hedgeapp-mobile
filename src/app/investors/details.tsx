import { router, useLocalSearchParams } from 'expo-router';
import { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  H3,
  H4,
  ListItem,
  ScrollView,
  Text,
  useTheme,
  View,
  YGroup,
  YStack,
} from 'tamagui';

import { useGetSingleInvestorQuery } from '@/api/investors.service';
import { HardHatIcon } from '@/assets/icons';
import InvestorContact from '@/components/investor-contact';
import StatusIcon from '@/components/status-icon';
import { formatPhoneNumber } from '@/utils/helpers';

const InvestorDetailsScreen: FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: investor } = useGetSingleInvestorQuery(+id);

  const theme = useTheme();
  console.log(investor?.locations[0].status);

  return (
    <ScrollView showsVerticalScrollIndicator={false} paddingHorizontal="$4">
      <SafeAreaView />
      <View flex={1} flexDirection="row" alignItems="center" gap="$2">
        <HardHatIcon strokeColor={theme.color12.val} />
        <H3>{investor?.name}</H3>
      </View>

      {investor && <InvestorContact investor={investor} variant="simplified" />}

      <H4 marginTop="$4">Kontakt</H4>
      <View paddingHorizontal="$2" gap={8}>
        <Text color={theme.color11}>{investor?.contactPerson}</Text>
        {investor?.phone && <Text color={theme.color11}>{formatPhoneNumber(investor.phone)}</Text>}
        {investor?.email && <Text color={theme.color11}>{investor?.email}</Text>}
      </View>

      {investor?.address.city && (
        <>
          <H4 marginTop="$4">Adres</H4>
          <View paddingHorizontal="$2" gap={8}>
            <Text color={theme.color11}>
              {`${investor?.address.city}, ${investor?.address.street} ${investor?.address.number}`}
            </Text>
            {investor?.address.zipCode && (
              <Text color={theme.color11}>
                {`${investor?.address.zipCode} ${investor?.address.city}`}
              </Text>
            )}
          </View>
        </>
      )}

      <H4 marginTop="$4">NIP</H4>
      <View paddingHorizontal="$2" gap={8}>
        <Text color={theme.color11}>{investor?.nip}</Text>
      </View>

      <H4 marginTop="$4">REGON</H4>
      <View paddingHorizontal="$2" gap={8}>
        <Text color={theme.color11}>{investor?.regon}</Text>
      </View>

      <H4 marginTop="$4">Inwestycje</H4>
      <YStack flex={1} marginTop="$2">
        <YGroup borderRadius={0}>
          {investor?.locations.map(investment => (
            <YGroup.Item key={investment.id}>
              <ListItem
                onPress={() =>
                  router.navigate({
                    pathname: '/investments/details',
                    params: { id: investment.id },
                  })
                }
                hoverTheme
                backgroundColor={theme.$color4}
                borderBottomColor={theme.$color6}
                borderBottomWidth={1}
                title={investment.name}
                subTitle={investment.investor.name}
                icon={<StatusIcon status={investment.status.id} strokeColor={theme.color11.val} />}
              />
            </YGroup.Item>
          ))}
        </YGroup>
      </YStack>

      <View marginVertical="$6" gap="$4">
        <Button
          backgroundColor={theme.$color12}
          color={theme.$color1}
          onPress={() =>
            router.navigate({
              pathname: '/investors/form',
              params: { id: investor?.id },
            })
          }>
          Edytuj
        </Button>
        <Button
          backgroundColor={theme.$color4}
          color={theme.$color12}
          borderColor={theme.$color12}
          onPress={() => router.back()}>
          Cofnij
        </Button>
      </View>
    </ScrollView>
  );
};

export default InvestorDetailsScreen;
