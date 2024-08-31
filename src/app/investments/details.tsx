import * as Location from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import { FC, useEffect, useRef, useState } from 'react';
import { useColorScheme } from 'react-native';
import MapView, { MapMarker } from 'react-native-maps';
import Toast from 'react-native-toast-message';
import { Button, H3, H4, ScrollView, Text, useTheme } from 'tamagui';

import { useGetSingleInvestmentQuery } from '@/api/investments.service';
import DateCard from '@/components/date-card';
import DateIndicator from '@/components/date-indicator';
import InvestorContact from '@/components/investor-contact';
import LocalizationButton from '@/components/localization-button';
import NavigationButton from '@/components/navigation-button';
import darkMap from '@/utils/dark-map.json';
import retroMap from '@/utils/retro-map.json';

const InvestmentDetailsScreen: FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: investment } = useGetSingleInvestmentQuery(+id);

  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isMapCentered, setIsMapCentered] = useState(true);

  const theme = useTheme();
  const mapRef = useRef<MapView>(null);
  const colorScheme = useColorScheme();

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
  }, [investment]);

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
        customMapStyle={colorScheme === 'dark' ? darkMap : retroMap}
        ref={mapRef}
        style={{ height: 250 }}
        showsCompass={false}
        showsMyLocationButton={false}>
        <MapMarker coordinate={coords || { latitude: 50.049683, longitude: 19.944544 }} />
      </MapView>
      <ScrollView showsVerticalScrollIndicator={false} paddingHorizontal="$4">
        <H3 paddingTop="$2">{investment?.name}</H3>
        <Text color={theme.color11}>
          {`${investment?.address.city}, ${investment?.address.street} ${investment?.address.number}`}
        </Text>

        {investment?.investor && <InvestorContact investor={investment?.investor} />}

        <H4 marginTop="$4">Terminy</H4>
        <DateIndicator
          title="Termin oględzin"
          date={investment?.inspectionDate || ''}
          isDone={investment?.inspectionDone || false}
          handleConfirmation={() => console.log('inspection confirmed')}
          handleWithdrawal={() => console.log('inspection withdrawn')}
        />
        <DateIndicator
          title="Termin wycinki"
          date={investment?.deforestationDate || ''}
          isDone={investment?.deforestationDone || false}
          handleConfirmation={() => console.log('deforestation confirmed')}
          handleWithdrawal={() => console.log('deforestation withdrawn')}
        />
        <DateIndicator
          title="Termin nasadzeń"
          date={investment?.plantingDate || ''}
          isDone={investment?.plantingDone || false}
          handleConfirmation={() => console.log('planting confirmed')}
          handleWithdrawal={() => console.log('planting withdrawn')}
        />

        <H4 marginTop="$4">Daty i terminy</H4>
        <DateCard
          title="Data złożenia wniosku"
          date={investment?.issueDate || ''}
          handlePress={() => console.log('issue date')}
        />
        <DateCard
          title="Data oględzin"
          date={investment?.inspectionDate || ''}
          handlePress={() => console.log('inspection date')}
        />
        <DateCard
          title="Data wydania decyzji"
          date={investment?.decisionDate || ''}
          handlePress={() => console.log('decision date')}
        />
        <DateCard
          title="Termin wycinki"
          date={investment?.deforestationDate || ''}
          handlePress={() => console.log('deforestation date')}
        />
        <DateCard
          title="Termin nasadzeń"
          date={investment?.plantingDate || ''}
          handlePress={() => console.log('planting date')}
        />

        <Button
          marginTop="$4"
          marginBottom="$8"
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
