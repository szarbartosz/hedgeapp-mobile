import Svg, { Path } from 'react-native-svg';

import { LucidIconProps } from '@/types/icons';

export const ChevronDownIcon = ({ width, height, strokeColor, ...props }: LucidIconProps) => (
  <Svg
    width={width || 24}
    height={height || 24}
    fill="none"
    stroke={strokeColor}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Path d="m6 9 6 6 6-6" />
  </Svg>
);
