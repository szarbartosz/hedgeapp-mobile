import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

interface UserIconProps extends SvgProps {
  width?: number;
  height?: number;
  strokeColor?: string;
}

export const UserIcon = ({ width, height, strokeColor, ...props }: UserIconProps) => (
  <Svg
    width={width || 24}
    height={height || 24}
    fill="none"
    stroke={strokeColor}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Circle cx="12" cy="12" r="10" />
    <Circle cx="12" cy="10" r="3" />
    <Path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </Svg>
);
