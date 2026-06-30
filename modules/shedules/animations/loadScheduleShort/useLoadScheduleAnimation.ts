import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface Props {
  savedVissible: boolean;
}

export const useLoadScheduleAnimation = ({ savedVissible }: Props) => {
  const { height } = useWindowDimensions();
  const heigthView = useSharedValue(0.82);

  useEffect(() => {
    if (savedVissible) {
      heigthView.value = withSpring(savedVissible ? 0.46 : 0.82);
    }
  }, [heigthView, savedVissible]);

  const savedShcedulesBehaviour = useAnimatedStyle(() => {
    return {
      marginTop: height * heigthView.value,
      height: height * 1 - heigthView.value,
    };
  });

  return {
    savedShcedulesBehaviour,
  };
};
