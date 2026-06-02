import { useEffect } from "react";
import {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export const useFadeInAnimation = (
  modalVisible: boolean,
  saveModalVisible: boolean,
) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    const isOpen = modalVisible || saveModalVisible;
    opacity.value = withTiming(isOpen ? 1 : 0, { duration: 300 });
  }, [modalVisible, saveModalVisible, opacity]);

  const fadeAnimated = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });

  return {
    fadeAnimated,
  };
};
