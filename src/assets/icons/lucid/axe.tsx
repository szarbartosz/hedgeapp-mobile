import Svg, { Path } from 'react-native-svg';
import { useTheme } from 'tamagui';

import { LucidIconProps } from '@/types/icons';

export const AxeIcon = ({ width, height, strokeColor, ...props }: LucidIconProps) => {
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
      <Path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9" />
      <Path d="M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 7z" />
    </Svg>
  );
};
