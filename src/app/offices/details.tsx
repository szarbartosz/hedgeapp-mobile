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
import StatusIcon from '@/components/status-icon';
import darkMap from '@/utils/dark-map.json';
import retroMap from '@/utils/retro-map.json';

const InvestmentDetailsScreen: FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: office,
    isLoading: isFetchingOffice,
    isSuccess: isOfficeFetched,
  } = useGetSingleOfficeQuery(+id);

  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isMapCentered, setIsMapCentered] = useState(true);

  const theme = useTheme();
  const mapRef = useRef<MapView>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchCoords = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === Location.PermissionStatus.GRANTED) {
        const address = `${office?.address.city}, ${office?.address.street} ${office?.address.number}`;
        const geoResult = await Location.geocodeAsync(address);

        setCoords({ latitude: geoResult[0].latitude, longitude: geoResult[0].longitude });
      }
    };

    if (isFetchingOffice && isOfficeFetched) {
      fetchCoords().catch(_err => {
        Toast.show({
          type: 'warning',
          props: {
            text1: 'Hmmm... 🧐',
            text2: 'Nie udało się pobrać lokalizacji urzędu',
          },
        });
      });
    }
  }, [office, isFetchingOffice, isOfficeFetched]);

  useEffect(() => {
    if (coords?.latitude && coords?.longitude) {
      mapRef.current?.animateToRegion(
        {
          latitude: coords?.latitude,
          longitude: coords?.longitude,
          latitudeDelta: 0.0035,
          longitudeDelta: 0.0035,
        },
        1000
      );
    }
  }, [coords]);

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
          latitude: 49.985318,
          longitude: 20.293428,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        customMapStyle={colorScheme === 'dark' ? darkMap : retroMap}
        ref={mapRef}
        style={{ height: 250 }}
        showsCompass={false}
        showsMyLocationButton={false}>
        {coords && <MapMarker coordinate={coords} />}
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
                  icon={
                    <StatusIcon status={investment.status.id} strokeColor={theme.color11.val} />
                  }
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
