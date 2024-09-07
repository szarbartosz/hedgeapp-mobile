import Svg, { Circle, Path } from 'react-native-svg';
import { useTheme } from 'tamagui';

import { LucidIconProps } from '@/types/icons';

export const UserSearchIcon = ({ width, height, strokeColor, ...props }: LucidIconProps) => {
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
      <Circle cx="10" cy="7" r="4" />
      <Path d="M10.3 15H7a4 4 0 0 0-4 4v2" />
      <Circle cx="17" cy="17" r="3" />
      <Path d="m21 21-1.9-1.9" />
    </Svg>
  );
};
