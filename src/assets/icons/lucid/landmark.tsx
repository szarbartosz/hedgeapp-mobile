import Svg, { Line, Polygon } from 'react-native-svg';
import { useTheme } from 'tamagui';

import { LucidIconProps } from '@/types/icons';

export const LandmarkIcon = ({ width, height, strokeColor, ...props }: LucidIconProps) => {
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
      <Line x1="3" x2="21" y1="22" y2="22" />
      <Line x1="6" x2="6" y1="18" y2="11" />
      <Line x1="10" x2="10" y1="18" y2="11" />
      <Line x1="14" x2="14" y1="18" y2="11" />
      <Line x1="18" x2="18" y1="18" y2="11" />
      <Polygon points="12 2 20 7 4 7" />
    </Svg>
  );
};
