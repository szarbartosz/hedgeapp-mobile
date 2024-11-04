import React, { FC } from 'react';
import { PressableProps } from 'react-native';
import { useTheme } from 'tamagui';

import {
  AxeIcon,
  CircleCheckIcon,
  FileCheckIcon,
  LaptopIcon,
  PuzzleIcon,
  ScaleIcon,
  SparklesIcon,
  SproutIcon,
  TreesIcon,
  UserSearchIcon,
} from '@/assets/icons';

type Props = {
  status: number;
  width?: number;
  height?: number;
  strokeColor?: string;
} & PressableProps;

type IconProps = {
  width?: number;
  height?: number;
  fill?: string;
  strokeColor?: string;
};

const StatusIcon: FC<Props> = ({ status, width, height, strokeColor, ...rest }) => {
  const theme = useTheme();

  const icons: { [key: number]: FC<IconProps> } = {
    1: SparklesIcon,
    2: TreesIcon,
    3: LaptopIcon,
    4: FileCheckIcon,
    5: PuzzleIcon,
    6: UserSearchIcon,
    7: ScaleIcon,
    8: AxeIcon,
    9: SproutIcon,
    10: CircleCheckIcon,
  };

  const StatusWrapper: FC<IconProps> = icons[status];

  if (!StatusWrapper) {
    return <></>;
  }

  return (
    <StatusWrapper
      width={width}
      height={height}
      strokeColor={strokeColor || theme.color12.val}
      {...rest}
    />
  );
};

export default StatusIcon;
