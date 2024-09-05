import Svg, { Path, Rect } from 'react-native-svg';

import { LucidIconProps } from '@/types/icons';

export const MailIcon = ({ width, height, strokeColor, ...props }: LucidIconProps) => (
  <Svg
    width={width || 24}
    height={height || 24}
    fill="none"
    stroke={strokeColor || '#505050'}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Rect width="20" height="16" x="2" y="4" rx="2" />
    <Path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Svg>
);
