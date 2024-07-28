import Svg, { Polygon } from 'react-native-svg';

import { LucidIconProps } from '@/types/icons';

export const NavigationIcon = ({ width, height, strokeColor, ...props }: LucidIconProps) => (
  <Svg
    width={width || 24}
    height={height || 24}
    fill="none"
    stroke={strokeColor}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Polygon points="3 11 22 2 13 21 11 13 3 11" />
  </Svg>
);
