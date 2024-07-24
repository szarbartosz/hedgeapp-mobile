import Svg, { Path } from 'react-native-svg';

import { LucidIconProps } from '@/types/icons';

export const HardHatIcon = ({ width, height, strokeColor, ...props }: LucidIconProps) => (
  <Svg
    width={width || 24}
    height={height || 24}
    fill="none"
    stroke={strokeColor}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
    <Path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
    <Path d="M4 15v-3a6 6 0 0 1 6-6" />
    <Path d="M14 6a6 6 0 0 1 6 6v3" />
  </Svg>
);
