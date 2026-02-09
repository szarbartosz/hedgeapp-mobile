import React, { FC } from 'react';
import { showLocation } from 'react-native-map-link';
import { Button, useTheme } from 'tamagui';

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
      top={70}
      right={10}
      position="absolute"
      zIndex={1}
      icon={<NavigationIcon strokeColor={coords ? theme.color12.val : theme.color10.val} />}
    />
  );
};

export default NavigationButton;
