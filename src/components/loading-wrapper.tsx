import { FC, ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { View } from 'tamagui';

type Props = {
  isLoading: boolean;
  children: ReactNode;
  animateChildren?: boolean;
  indicatorWidth?: number;
  indicatorHeight?: number;
};

const LoadingWrapper: FC<Props> = ({ isLoading, children, animateChildren = true }) =>
  isLoading ? (
    <View display="flex" flexGrow={1} alignItems="center" justifyContent="center">
      <ActivityIndicator />
    </View>
  ) : (
    <Animated.View style={{ flex: 1 }} entering={animateChildren ? FadeIn : undefined}>
      {children}
    </Animated.View>
  );

export default LoadingWrapper;
