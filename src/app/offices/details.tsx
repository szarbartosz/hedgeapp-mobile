import * as Location from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import { FC, useEffect, useRef, useState } from 'react';
import { useColorScheme } from 'react-native';
import MapView, { MapMarker } from 'react-native-maps';
import Toast from 'react-native-toast-message';
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

import { useGetSingleOfficeQuery } from '@/api/offices.service';
import LocalizationButton from '@/components/localization-button';
import NavigationButton from '@/components/navigation-button';
import darkMap from '@/utils/dark-map.json';
import { getStatusIcon } from '@/utils/helpers';
import retroMap from '@/utils/retro-map.json';

const InvestmentDetailsScreen: FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: office } = useGetSingleOfficeQuery(+id);

  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isMapCentered, setIsMapCentered] = useState(true);

  const theme = useTheme();
  const mapRef = useRef<MapView>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchCoords = async () => {
      const address = `${office?.address.city}, ${office?.address.street} ${office?.address.number}`;
      const geoResult = await Location.geocodeAsync(address);

      setCoords({ latitude: geoResult[0].latitude, longitude: geoResult[0].longitude });
    };

    fetchCoords().catch(_err => {
      Toast.show({
        type: 'warning',
        props: {
          text1: 'Wystąpił błąd!',
          text2: 'Nie udało się pobrać lokalizacji urzędu...',
        },
      });
    });
  }, [office]);

  return (
    <>
      <LocalizationButton
        mapRef={mapRef}
        coords={coords}
        isMapCentered={isMapCentered}
        setIsMapCentered={setIsMapCentered}
      />
      <NavigationButton
        address={`${office?.address.city}, ${office?.address.street} ${office?.address.number}`}
        coords={coords}
      />
      <MapView
        onPanDrag={() => setIsMapCentered(false)}
        region={{
          latitude: coords?.latitude || 50.049683,
          longitude: coords?.longitude || 19.944544,
          latitudeDelta: 0.0035,
          longitudeDelta: 0.0035,
        }}
        customMapStyle={colorScheme === 'dark' ? darkMap : retroMap}
        ref={mapRef}
        style={{ height: 250 }}
        showsCompass={false}
        showsMyLocationButton={false}>
        <MapMarker coordinate={coords || { latitude: 50.049683, longitude: 19.944544 }} />
      </MapView>
      <ScrollView showsVerticalScrollIndicator={false} paddingHorizontal="$4">
        <H3 paddingTop="$2">{office?.address.city}</H3>
        <Text color={theme.color12}>{`${office?.address.street} ${office?.address.number}`}</Text>
        <Text color={theme.color12}>{office?.name}</Text>

        <H4 marginTop="$4">Inwestycje</H4>
        <YStack flex={1} marginTop="$2">
          <YGroup borderRadius={0}>
            {office?.locations.map(investment => (
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
                  icon={getStatusIcon(investment.status.id)}
                />
              </YGroup.Item>
            ))}
          </YGroup>
        </YStack>

        <View marginVertical="$6" gap="$4">
          <Button
            backgroundColor={theme.$color4}
            color={theme.$color12}
            borderColor={theme.$color12}
            onPress={() => router.back()}>
            Cofnij
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default InvestmentDetailsScreen;
