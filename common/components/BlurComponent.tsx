import { globalStyles } from "@/global-style";
import { BlurView } from "expo-blur";
import React from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const BlurComponent = () => {
  return (
    <Animated.View
      style={globalStyles.BlurViewAnimatedContainer}
      entering={FadeIn.springify().duration(200)}
      exiting={FadeOut.springify().duration(200)}
    >
      <BlurView
        intensity={40}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
        style={{ ...globalStyles.BlurViewAnimatedContainer, zIndex: 10 }}
      />
    </Animated.View>
  );
};

export default BlurComponent;
