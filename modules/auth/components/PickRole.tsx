import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Pressable, Text, useWindowDimensions } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface Props {
  setRole: (term: string) => void;
  setVisible: (term: boolean) => void;
}

const PickRole = ({ setRole, setVisible }: Props) => {
  const { height, width } = useWindowDimensions();
  return (
    <Animated.View
      style={[
        {
          width: width,
          height: height * 0.2,
          backgroundColor: "white",
          borderRadius: 40,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          padding: 20,
        },
      ]}
      entering={FadeInDown.duration(100).delay(200)}
    >
      <Pressable
        style={{ position: "absolute", right: 30, top: 20 }}
        onPress={() => setVisible(false)}
      >
        <Feather name="x" size={25} />
      </Pressable>
      <Pressable onPress={() => setRole("therapist")}>
        <Text className="text-2xl">Terapeuta</Text>
      </Pressable>
      <Pressable onPress={() => setRole("user")}>
        <Text className="text-2xl">Usuario</Text>
      </Pressable>
    </Animated.View>
  );
};

export default PickRole;
