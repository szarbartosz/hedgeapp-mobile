import React, { FC } from 'react';
import { Pressable } from 'react-native';
import { showLocation } from 'react-native-map-link';
import { useTheme } from 'tamagui';

import { NavigationIcon } from '@/assets/icons';

type Props = {
  address: string;
  coords: { latitude: number; longitude: number } | null;
};

const NavigationButton: FC<Props> = ({ address, coords }) => {
  const theme = useTheme();

  const handlePress = async () => {
    if (coords) {
      await showLocation({
        latitude: coords?.latitude,
        longitude: coords?.longitude,
        title: address,
      });
    } else {
      await showLocation({
        address: address,
      });
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
        top: 70,
        right: 10,
        position: 'absolute',
        zIndex: 1,
        paddingRight: 2,
      }}>
      <NavigationIcon strokeColor={coords ? theme.color12.val : theme.color10.val} />
    </Pressable>
  );
};

export default NavigationButton;
