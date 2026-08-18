import { DAMPING_TOOLBAR_CONFIG } from "@/constants/global-constatnt";
import { use, useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { EditModeContext } from "../../context/edit-mode-context/EditModeContext";

export const usePictoResizeAnimation = (imageDimenssion: number) => {
  const editModeContext = use(EditModeContext);
  const { isEditMode } = editModeContext!;

  const width = useSharedValue(imageDimenssion);
  const height = useSharedValue(imageDimenssion);

  useEffect(() => {
    width.value = withSpring(
      isEditMode ? 140 : imageDimenssion!,
      DAMPING_TOOLBAR_CONFIG,
    );
    height.value = withSpring(
      isEditMode ? 140 : imageDimenssion!,
      DAMPING_TOOLBAR_CONFIG,
    );
  }, [width, height, isEditMode, imageDimenssion]);

  const reduceScaleInEditMode = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
    };
  });

  return { reduceScaleInEditMode };
};
