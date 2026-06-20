import { Gesture } from "react-native-gesture-handler";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const useButtonPress = () => {
  const pressed = useSharedValue(false);

  const tapGesture = Gesture.Tap()
    .maxDuration(2000)
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const pressedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(pressed.value ? 0.99 : 1, { duration: 200 }) },
      ],
      filter: [
        { contrast: withTiming(pressed.value ? 0.8 : 1, { duration: 100 }) },
      ],
    };
  });

  return {
    tapGesture,
    pressedStyle,
  };
};

export default useButtonPress;
