import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const useToolBarAnimation = (triger: boolean) => {
  const width = useSharedValue(80);

  useEffect(() => {
    width.value = withSpring(triger ? 245 : 80, { duration: 200 });
  }, [triger, width]);

  const toolBarWitdt = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  return {
    toolBarWitdt,
  };
};
