import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

interface Props {
  isHorario: boolean;
  isArticle: boolean;
}

export const useTabBarAnimation = ({ isHorario, isArticle }: Props) => {
  const { width } = useWindowDimensions();
  const leftValue = useSharedValue(width * 0.14);

  useEffect(() => {
    if (isHorario) {
      leftValue.value = withSpring(width * 0.397, { duration: 400 });
    } else if (isArticle) {
      leftValue.value = withSpring(width * 0.67, { duration: 400 });
    } else {
      leftValue.value = withSpring(width * 0.142, { duration: 400 });
    }
  }, [isHorario, isArticle, width, leftValue]);

  const movementStyle = useAnimatedStyle(() => ({
    left: leftValue.value,
  }));

  return { movementStyle };
};
