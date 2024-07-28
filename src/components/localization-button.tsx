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
    mapRef?.current?.animateToRegion(
      {
        latitude: coords?.latitude || 50.049683,
        longitude: coords?.longitude || 19.944544,
        latitudeDelta: 0.0035,
        longitudeDelta: 0.0035,
      },
      1000
    );
    setIsMapCentered?.(true);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        width: 50,
        height: 50,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.color4.val,
        borderWidth: 1.5,
        borderColor: theme.color10.val,
        top: 190,
        right: 10,
        position: 'absolute',
        zIndex: 10,
      }}>
      {isMapCentered ? (
        <LocateFixedIcon strokeColor={theme.color12.val} />
      ) : (
        <LocateIcon strokeColor={theme.color12.val} />
      )}
    </Pressable>
  );
};

export default LocalizationButton;
