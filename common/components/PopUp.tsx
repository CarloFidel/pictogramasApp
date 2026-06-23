import { globalStyles } from "@/global-style";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface Props {
  text: string;
  buttonText?: string;
  onPress: () => void;
}
const PopUp = ({ onPress, buttonText = "Ok", text }: Props) => {
  const { width } = useWindowDimensions();

  return (
    <Animated.View
      entering={FadeInDown.springify().duration(800)}
      className="absolute bg-white justify-center border border-gray-200 items-center p-2 py-8 rounded-xl gap-5 mt-2"
      style={{
        top: "40%",
        right: width - width * 0.92,
      }}
    >
      <Ionicons name="warning-outline" size={30} color="black" />
      <Text className="text-center" style={{ width: width * 0.5 }}>
        {text}
      </Text>
      <Pressable
        style={[
          styles.button,
          globalStyles.shadow_sm,
          { marginVertical: 20, width: width * 0.75 },
        ]}
        onPress={onPress}
      >
        <Text className="text-white ">{buttonText}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  button: {
    width: 360,
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
