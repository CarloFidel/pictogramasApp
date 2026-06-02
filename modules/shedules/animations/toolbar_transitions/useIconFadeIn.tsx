import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const useIconFadeIn = (triger: boolean) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(triger ? 1 : 0, { duration: 700 });
  }, [triger, opacity]);

  const iconsFadeIn = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return {
    iconsFadeIn,
  };
};
