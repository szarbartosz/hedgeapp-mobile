import Svg, { Circle, Line } from 'react-native-svg';
import { useTheme } from 'tamagui';

import { LucidIconProps } from '@/types/icons';

export const LocateFixedIcon = ({ width, height, strokeColor, ...props }: LucidIconProps) => {
  const theme = useTheme();

  return (
    <Svg
      width={width || 24}
      height={height || 24}
      fill="none"
      stroke={strokeColor || theme.color11.val}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <Line x1="2" x2="5" y1="12" y2="12" />
      <Line x1="19" x2="22" y1="12" y2="12" />
      <Line x1="12" x2="12" y1="2" y2="5" />
      <Line x1="12" x2="12" y1="19" y2="22" />
      <Circle cx="12" cy="12" r="7" />
      <Circle cx="12" cy="12" r="3" />
    </Svg>
  );
};
