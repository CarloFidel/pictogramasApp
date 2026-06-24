import React from "react";
import { ActivityIndicator, useWindowDimensions } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

const Loading = () => {
  const { width } = useWindowDimensions();

  return (
    <Animated.View
      entering={FadeInDown.springify().duration(400).delay(100)}
      exiting={FadeOutDown.springify().duration(100)}
      className="absolute bg-white justify-center items-center p-2 py-8 rounded-xl gap-5 px-5 opacity-80"
      style={{ width: width * 0.25, left: width * 0.375, top: "40%" }}
    >
      <ActivityIndicator size={40} />
    </Animated.View>
  );
};

export default Loading;
