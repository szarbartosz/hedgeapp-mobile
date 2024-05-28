import Svg, { Path, SvgProps } from 'react-native-svg';

interface EyeClosedIconProps extends SvgProps {
  width?: number;
  height?: number;
  strokeColor?: string;
}

export const EyeClosedIcon = ({ width, height, strokeColor, ...props }: EyeClosedIconProps) => (
  <Svg width={width || 24} height={height || 24} fill="none" {...props}>
    <Path
      stroke={strokeColor || '#000000'}
      strokeWidth={1.5}
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M11 17.4167V19.25M11 17.4167C9.58017 17.4167 8.36275 17.0365 7.33333 16.4613M11 17.4167C12.4198 17.4167 13.6372 17.0365 14.6667 16.4613M7.33333 16.4613L6.41667 17.875M7.33333 16.4613C6.19221 15.8236 5.28209 14.9462 4.58333 14.0812M4.58333 14.0812C3.32266 12.5205 2.75 11 2.75 11M4.58333 14.0812L3.66667 14.6667M14.6667 16.4613L15.5833 17.875M14.6667 16.4613C15.8078 15.8236 16.7179 14.9462 17.4167 14.0812M17.4167 14.0812C18.6773 12.5205 19.25 11 19.25 11M17.4167 14.0812L18.3333 14.6667"
    />
  </Svg>
);
