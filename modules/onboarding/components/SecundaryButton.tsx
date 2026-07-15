import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";

interface Props {
  iconDimentions?: number;
  backGroundColor?: string;
  icon?: React.ComponentProps<typeof Feather>["name"];
  text?: string;
  textColor?: string;
  iconColor?: string;
  onPress: () => void;
}

const SecundaryButton = ({
  backGroundColor,
  icon,
  iconDimentions,
  text,
  textColor,
  iconColor,
  onPress,
}: Props) => {
  const { width } = useWindowDimensions();

  return (
    <Animated.View className={"justify-center items-center gap-4"}>
      <Pressable
        style={[
          styles.button,
          //globalStyles.shadow_sm,
          {
            width: width * 0.8,
            backgroundColor: backGroundColor,
          },
        ]}
        onPress={onPress}
      >
        <Text style={{ color: textColor }}>{text}</Text>
        {icon && (
          <Feather name={icon} size={iconDimentions || 24} color={iconColor} />
        )}
      </Pressable>
    </Animated.View>
  );
};

export default SecundaryButton;

const styles = StyleSheet.create({
  button: {
    height: 55,
    backgroundColor: "#0F5CB3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});
