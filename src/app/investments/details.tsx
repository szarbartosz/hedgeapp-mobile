import * as Location from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import { FC, useEffect, useRef, useState } from 'react';
import MapView, { MapMarker } from 'react-native-maps';
import Toast from 'react-native-toast-message';
import { Button, H3, H4, ScrollView, Text, useTheme, View, XGroup } from 'tamagui';

import { HardHatIcon, PhoneIcon } from '@/assets/icons';
import DeadlineCountdown from '@/components/deadline-countdown';
import LocalizationButton from '@/components/localization-button';
import NavigationButton from '@/components/navigation-button';
import { investments } from '@/utils/data';

const InvestmentDetailsScreen: FC = () => {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isMapCentered, setIsMapCentered] = useState(true);

  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const mapRef = useRef<MapView>(null);

  const investment = investments.find(i => i.id.toString() === id);

  useEffect(() => {
    const fetchCoords = async () => {
      const address = `${investment?.address.city}, ${investment?.address.street} ${investment?.address.number}`;
      const geoResult = await Location.geocodeAsync(address);

      setCoords({ latitude: geoResult[0].latitude, longitude: geoResult[0].longitude });
    };

    fetchCoords().catch(_err => {
      Toast.show({
        type: 'warning',
        props: {
          text1: 'Wystąpił błąd!',
          text2: 'Nie udało się pobrać lokalizacji inwestycji...',
        },
      });
    });
  }, []);

  return (
    <>
      <LocalizationButton
        mapRef={mapRef}
        coords={coords}
        isMapCentered={isMapCentered}
        setIsMapCentered={setIsMapCentered}
      />
      <NavigationButton
        address={`${investment?.address.city}, ${investment?.address.street} ${investment?.address.number}`}
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
        ref={mapRef}
        style={{ height: 250 }}
        showsMyLocationButton={false}>
        <MapMarker coordinate={coords || { latitude: 50.049683, longitude: 19.944544 }} />
      </MapView>
      <ScrollView showsVerticalScrollIndicator={false} paddingHorizontal="$4">
        <H3 paddingTop="$2">{investment?.name}</H3>
        <Text color={theme.color11}>
          {`${investment?.address.city}, ${investment?.address.street} ${investment?.address.number}`}
        </Text>

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
              <Text maxWidth={110} numberOfLines={1}>
                {investment?.investor.name}
              </Text>
              <Text maxWidth={110} numberOfLines={1} color={theme.color11} fontSize={12}>
                {investment?.investor.contactPerson}
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
            <Text>Zadzwoń</Text>
          </View>
        </View>

        <H4 marginTop="$4">Terminy</H4>

        <Text margin="$2">Termin oględzin</Text>
        {investment?.inspectionDate ? (
          <XGroup backgroundColor="$color2">
            <XGroup.Item>
              <Button
                backgroundColor="$color1"
                width="50%"
                size="$4"
                borderWidth={1}
                borderRightWidth={0.5}
                borderColor="$color5"
                disabled
                chromeless>
                {investment?.inspectionDone ? (
                  <Text fontWeight={800}>wykonano</Text>
                ) : (
                  <DeadlineCountdown dates={[investment?.inspectionDate]} fontWeight={800} />
                )}
              </Button>
            </XGroup.Item>

            <XGroup.Item>
              <Button
                backgroundColor="$color1"
                width="50%"
                size="$4"
                borderWidth={1}
                borderLeftWidth={0.5}
                borderColor="$color5"
                chromeless>
                {investment?.inspectionDone ? 'cofnij potwierdzenie' : 'potwierdź wykonanie'}
              </Button>
            </XGroup.Item>
          </XGroup>
        ) : (
          <Button width="50%" size="$2" chromeless>
            niesprecyzowano
          </Button>
        )}

        <Text margin="$2">Termin wycinki</Text>
        {investment?.deforestationDate ? (
          <XGroup backgroundColor="$color2">
            <XGroup.Item>
              <Button
                backgroundColor="$color1"
                width="50%"
                size="$4"
                borderWidth={1}
                borderRightWidth={0.5}
                borderColor="$color5"
                disabled
                chromeless>
                {investment?.deforestationDone ? (
                  <Text fontWeight={800}>wykonano</Text>
                ) : (
                  <DeadlineCountdown dates={[investment?.deforestationDate]} fontWeight={800} />
                )}
              </Button>
            </XGroup.Item>

            <XGroup.Item>
              <Button
                backgroundColor="$color1"
                width="50%"
                size="$4"
                borderWidth={1}
                borderLeftWidth={0.5}
                borderColor="$color5"
                chromeless>
                {investment?.deforestationDone ? 'cofnij potwierdzenie' : 'potwierdź wykonanie'}
              </Button>
            </XGroup.Item>
          </XGroup>
        ) : (
          <Button width="50%" size="$2" chromeless>
            niesprecyzowano
          </Button>
        )}

        <Text margin="$2">Termin nasadzeń</Text>
        {investment?.plantingDate ? (
          <XGroup backgroundColor="$color2">
            <XGroup.Item>
              <Button
                backgroundColor="$color1"
                width="50%"
                size="$4"
                borderWidth={1}
                borderRightWidth={0.5}
                borderColor="$color5"
                disabled
                chromeless>
                {investment?.plantingDone ? (
                  <Text fontWeight={800}>wykonano</Text>
                ) : (
                  <DeadlineCountdown dates={[investment?.plantingDate]} fontWeight={800} />
                )}
              </Button>
            </XGroup.Item>

            <XGroup.Item>
              <Button
                backgroundColor="$color1"
                width="50%"
                size="$4"
                borderWidth={1}
                borderLeftWidth={0.5}
                borderColor="$color5"
                chromeless>
                {investment?.plantingDone ? 'cofnij potwierdzenie' : 'potwierdź wykonanie'}
              </Button>
            </XGroup.Item>
          </XGroup>
        ) : (
          <Button width="50%" size="$2" chromeless>
            niesprecyzowano
          </Button>
        )}

        <H4 marginTop="$4">Daty i terminy</H4>

        <Button
          marginTop="$4"
          backgroundColor={theme.$color4}
          color={theme.$color12}
          borderColor={theme.$color12}
          onPress={() => router.back()}>
          Cofnij
        </Button>
      </ScrollView>
    </>
  );
};

export default InvestmentDetailsScreen;
