import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable } from "react-native";

interface Props {
  position?: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
}

const SecundaryButton = ({ onPress, icon, position }: Props) => {
  return (
    <Pressable
      className={`absolute ${position} p-3 rounded-full bg-white`}
      onPress={onPress}
    >
      <Ionicons name={icon} size={30} color="black" />
    </Pressable>
  );
};

export default SecundaryButton;
