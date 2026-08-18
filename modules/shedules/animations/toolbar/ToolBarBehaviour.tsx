import { DAMPING_TOOLBAR_CONFIG } from "@/constants/global-constatnt";
import { useEffect } from "react";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export const useToolBarBehaviour = (
  playMode: boolean,
  editMode: boolean,
  fullToolBar: boolean,
  deleteZone: boolean,
) => {
  let inicialWidth = fullToolBar ? 245 : 65;

  const translate = useSharedValue(0);
  const width = useSharedValue(inicialWidth);
  const paddingX = useSharedValue(0);
  const borderRadius = useSharedValue(20);
  const progress = useSharedValue(0);

  const flagToScale = useSharedValue(false);

  useEffect(() => {
    if (playMode) {
      translate.value = withDelay(200, withSpring(140, DAMPING_TOOLBAR_CONFIG));
    } else if (editMode) {
      translate.value = withDelay(
        200,
        withSpring(-140, DAMPING_TOOLBAR_CONFIG),
      );
    } else {
      translate.value = withDelay(200, withSpring(0, DAMPING_TOOLBAR_CONFIG));
    }

    flagToScale.value = deleteZone;
    borderRadius.value = withTiming(playMode ? 100 : 20, { duration: 300 });
    width.value = withTiming(fullToolBar ? 245 : inicialWidth, {
      duration: 400,
    });
    progress.value = withSpring(editMode ? 1 : 0, { duration: 200 });
  }, [
    playMode,
    editMode,
    translate,
    width,
    borderRadius,
    fullToolBar,
    inicialWidth,
    progress,
    deleteZone,
    flagToScale,
  ]);

  const toolBarBehaviour = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translate.value }],
      width: width.value,
      paddingLeft: paddingX.value,
      paddingRight: paddingX.value,
      borderRadius: borderRadius.value,
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ["#0F5CB3", "white"],
      ),
    };
  });

  const deleteZoneStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(flagToScale.value ? 1.8 : 1, {
            damping: 10,
            stiffness: 180,
            mass: 0.5,
          }),
        },
      ],
    };
  });

  return {
    toolBarBehaviour,
    deleteZoneStyle,
  };
};
