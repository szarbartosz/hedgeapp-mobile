import Svg, { Path, SvgProps } from 'react-native-svg';

interface EyeIconProps extends SvgProps {
  width?: number;
  height?: number;
  strokeColor?: string;
}

export const EyeIcon = ({ width, height, strokeColor, ...props }: EyeIconProps) => (
  <Svg width={width || 24} height={height || 14} fill="none" {...props}>
    <Path
      stroke={strokeColor || '#000000'}
      strokeWidth={1.5}
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M9.99676 10.2575C8.13656 10.2575 6.63411 8.79673 6.63411 6.99509C6.63411 5.20327 8.13599 3.74309 9.99676 3.74309C11.8575 3.74309 13.3639 5.20327 13.3639 6.99509C13.3639 8.79673 11.857 10.2575 9.99676 10.2575ZM10.0029 1C5.3876 1 2.46595 4.32945 1.27737 6.02527C0.913996 6.54836 0.905558 7.45491 1.26444 7.97909C2.42601 9.68473 5.29478 13 10.0029 13C14.7055 13 17.5748 9.68473 18.7358 7.97909C19.0953 7.45491 19.0851 6.54836 18.7223 6.02527C17.5338 4.32945 14.6177 1 10.0029 1Z"
    />
  </Svg>
);
