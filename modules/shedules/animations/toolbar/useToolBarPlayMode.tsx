import { useEffect } from "react";
import {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
} from "react-native-reanimated";

export const useToolBarPlayMode = (playMode: boolean, fullToolBar: boolean) => {
  const translate = useSharedValue(0);
  const width = useSharedValue(70);
  const paddingX = useSharedValue(0);
  const borderRadius = useSharedValue(20);

  useEffect(() => {
    translate.value = withDelay(
      200,
      withSpring(playMode ? 160 : 0, {
        damping: 10,
        stiffness: 120,
        mass: 0.5,
      }),
    );
    width.value = withDelay(
      200,
      withSpring(playMode ? 60 : 245, {
        damping: 10,
        stiffness: 120,
        mass: 0.5,
      }),
    );
    if (fullToolBar) {
      width.value = withSpring(245, { duration: 300 });
    }
    borderRadius.value = withSpring(playMode ? 100 : 20, { duration: 200 });
    paddingX.value = withSpring(playMode ? 0 : 10, { duration: 300 });
  }, [playMode, translate, width, paddingX, borderRadius, fullToolBar]);

  const toolBarPLayMode = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translate.value }],
      width: width.value,
      paddingLeft: paddingX.value,
      paddingRight: paddingX.value,
      borderRadius: borderRadius.value,
    };
  });

  return {
    toolBarPLayMode,
  };
};
