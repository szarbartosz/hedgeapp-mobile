import React, { FC, RefObject } from 'react';
import { Pressable } from 'react-native';
import MapView from 'react-native-maps';
import { useTheme } from 'tamagui';

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
    <Pressable
      onPress={handlePress}
      disabled={!coords?.latitude || !coords?.longitude}
      style={{
        width: 50,
        height: 50,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: coords ? theme.color4.val : theme.color2.val,
        borderWidth: 1.5,
        borderColor: theme.color10.val,
        top: 130,
        right: 10,
        position: 'absolute',
        zIndex: 1,
      }}>
      {isMapCentered ? (
        <LocateFixedIcon strokeColor={coords ? theme.color12.val : theme.color10.val} />
      ) : (
        <LocateIcon strokeColor={coords ? theme.color12.val : theme.color10.val} />
      )}
    </Pressable>
  );
};

export default LocalizationButton;
