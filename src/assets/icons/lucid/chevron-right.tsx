import Svg, { Path } from 'react-native-svg';

import { LucidIconProps } from '@/types/icons';

export const ChevronRightIcon = ({ width, height, strokeColor, ...props }: LucidIconProps) => (
  <Svg
    width={width || 24}
    height={height || 24}
    fill="none"
    stroke={strokeColor || '#282828'}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Path d="m9 18 6-6-6-6" />
  </Svg>
);
