import Svg, { Polygon } from 'react-native-svg';
import { useTheme } from 'tamagui';

import { LucidIconProps } from '@/types/icons';

export const NavigationIcon = ({ width, height, strokeColor, ...props }: LucidIconProps) => {
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
      <Polygon points="3 11 22 2 13 21 11 13 3 11" />
    </Svg>
  );
};
