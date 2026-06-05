import { useEffect } from "react";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

export const useToolBarEditMode = (editMode: boolean, fullToolBar: boolean) => {
  const translate = useSharedValue(0);
  const width = useSharedValue(70);
  const paddingX = useSharedValue(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    translate.value = withDelay(
      100,
      withSpring(editMode ? -160 : 0, {
        damping: 10,
        stiffness: 120,
        mass: 0.5,
      }),
    );
    if (editMode) {
      width.value = withSpring(60, {
        damping: 10,
        stiffness: 100,
        mass: 0.6,
      });
    }
    if (fullToolBar) {
      width.value = withSpring(245, { duration: 300 });
    }
    paddingX.value = withSpring(editMode ? 0 : 10, { duration: 300 });
    progress.value = withDelay(
      60,
      withSpring(editMode ? 1 : 0, { duration: 300 }),
    );
  }, [editMode, translate, width, paddingX, progress, fullToolBar]);

  const toolBarEditMode = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translate.value }],
      width: width.value,
      paddingLeft: paddingX.value,
      paddingRight: paddingX.value,
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ["#0F5CB3", "white"],
      ),
    };
  });

  return {
    toolBarEditMode,
  };
};
