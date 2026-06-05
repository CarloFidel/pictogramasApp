import { useEffect } from "react";
import {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

export const useToolBarWithPictos = (trigger: boolean) => {
  const width = useSharedValue(80);

  useEffect(() => {
    width.value = withSpring(trigger ? 245 : 80, { duration: 200 });
  }, [trigger, width]);

  const toolBarWidthExpand = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  return {
    toolBarWidthExpand,
  };
};
