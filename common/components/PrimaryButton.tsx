import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";

export type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

interface Props {
  border?: boolean;
  borderColor?: string;
  iconDimentions?: number;
  backGroundColor?: string;
  icon?: FeatherIconName;
  text?: string;
  textColor?: string;
  iconColor?: string;
  onPress: () => void;
}

const PrimaryButton = ({
  backGroundColor,
  icon,
  iconDimentions,
  text,
  textColor,
  iconColor,
  onPress,
  border,
  borderColor,
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
            borderWidth: border ? 1 : 0,
            borderColor: borderColor,
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

export default PrimaryButton;

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
