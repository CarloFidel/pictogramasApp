import { BlurView } from "expo-blur";
import React from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const BlurComponent = () => {
  return (
    <Animated.View
      className="absolute inset-0"
      entering={FadeIn.springify()}
      exiting={FadeOut.springify().duration(300)}
    >
      <BlurView
        intensity={80}
        tint="default"
        experimentalBlurMethod="dimezisBlurView"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
        }}
      ></BlurView>
    </Animated.View>
  );
};

export default BlurComponent;
