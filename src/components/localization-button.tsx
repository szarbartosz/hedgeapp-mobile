import React, { FC, RefObject } from 'react';
import MapView from 'react-native-maps';
import { Button, useTheme } from 'tamagui';

import { LocateFixedIcon, LocateIcon } from '@/assets/icons';

type Props = {
  mapRef: RefObject<MapView>;
  coords: { latitude: number; longitude: number } | null;
  isMapCentered: boolean;
  setIsMapCentered?: (isMapCentered: boolean) => void;
};

const LocalizationButton: FC<Props> = ({ mapRef, coords, isMapCentered, setIsMapCentered }) => {
  const theme = useTheme();

  const handlePress = () => {
    if (coords?.latitude && coords?.longitude) {
      mapRef?.current?.animateToRegion(
        {
          latitude: coords?.latitude,
          longitude: coords?.longitude,
          latitudeDelta: 0.0035,
          longitudeDelta: 0.0035,
        },
        1000
      );
      setIsMapCentered?.(true);
    }
  };

  return (
    <Button
      onPress={handlePress}
      disabled={!coords?.latitude || !coords?.longitude}
      width={50}
      height={50}
      borderRadius={8}
      justifyContent="center"
      alignItems="center"
      backgroundColor={coords ? theme.color4.val : theme.color2.val}
      borderWidth={1.5}
      borderColor={theme.color8.val}
      pressStyle={{
        backgroundColor: theme.color6.val,
        borderColor: theme.color10.val,
      }}
      top={130}
      right={10}
      position="absolute"
      zIndex={1}
      icon={
        isMapCentered ? (
          <LocateFixedIcon strokeColor={coords ? theme.color12.val : theme.color10.val} />
        ) : (
          <LocateIcon strokeColor={coords ? theme.color12.val : theme.color10.val} />
        )
      }
    />
  );
};

export default LocalizationButton;
