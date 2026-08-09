import { useEffect } from "react";
import { Platform, useWindowDimensions } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface Props {
  savedVissible: boolean;
}

export const useLoadScheduleAnimation = ({ savedVissible }: Props) => {
  console.log(Platform.OS);
  const { height } = useWindowDimensions();

  const initialValue = Platform.OS === "ios" ? 0.83 : 0.77;
  const modifyValue = Platform.OS === "ios" ? 0.45 : 0.4;
  const heigthView = useSharedValue(initialValue);

  useEffect(() => {
    if (savedVissible) {
      heigthView.value = withSpring(savedVissible ? modifyValue : initialValue);
    }
  }, [heigthView, savedVissible, modifyValue, initialValue]);

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
