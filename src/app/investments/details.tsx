import * as Location from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import { FC, useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import MapView, { MapMarker } from 'react-native-maps';
import { H3, H4, ScrollView, Text, useTheme, View } from 'tamagui';

import { HardHatIcon, PhoneIcon } from '@/assets/icons';
import { investments } from '@/utils/data';

const InvestmentDetailsScreen: FC = () => {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();

  const investment = investments.find(i => i.id.toString() === id);

  const getCoords = async () => {
    const geoResult = await Location.geocodeAsync(
      `${investment?.address?.city}, ${investment?.address?.street} ${investment?.address?.number}`
    );
    setCoords({ latitude: geoResult[0].latitude, longitude: geoResult[0].longitude });
  };

  useEffect(() => {
    const fetchCoords = async () => {
      const address = `${investment?.address.city}, ${investment?.address.street} ${investment?.address.number}`;
      const geoResult = await Location.geocodeAsync(address);

      setCoords({ latitude: geoResult[0].latitude, longitude: geoResult[0].longitude });
    };

    fetchCoords().catch(console.error);
  }, []);

  return (
    <>
      <MapView
        region={{
          latitude: coords?.latitude || 50.049683,
          longitude: coords?.longitude || 19.944544,
          latitudeDelta: 0.0035,
          longitudeDelta: 0.0035,
        }}
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
          backgroundColor={theme.color1}
          flex={1}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          borderRadius={10}
          borderWidth={1}
          borderColor={theme.color5}
          padding="$4"
          marginTop="$4">
          <View
            display="flex"
            width={160}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap={12}>
            <HardHatIcon strokeColor={theme.color12.val} />
            <View>
              <Text>{investment?.investor.name}</Text>
              <Text>{investment?.investor.contactPerson}</Text>
            </View>
          </View>
          <View display="flex" height={46} borderWidth={0.5} borderColor={theme.color11.val}></View>
          <View
            display="flex"
            width={160}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap={12}>
            <PhoneIcon strokeColor={theme.color12.val} />
            <Text>Zadzwoń</Text>
          </View>
        </View>

        <H4 marginTop="$4">Terminy</H4>
        <Pressable onPress={() => router.back()}>
          <H4>COFNIJ</H4>
        </Pressable>
      </ScrollView>
    </>
  );
};

export default InvestmentDetailsScreen;
