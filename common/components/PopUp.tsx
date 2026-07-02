import { globalStyles } from "@/global-style";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, useWindowDimensions } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import PrimaryButton from "./PrimaryButton";

interface Props {
  warning?: boolean;
  text: string;
  buttonText?: string;
  onPress: () => void;
}
const PopUp = ({
  onPress,
  buttonText = "Ok",
  text,
  warning = false,
}: Props) => {
  const { width, height } = useWindowDimensions();

  return (
    <Animated.View
      entering={FadeInDown.springify().duration(800)}
      className="absolute bg-white justify-center border border-gray-200 items-center p-2 py-8 rounded-xl gap-5 mt-2"
      style={{
        top: height * 0.35,
        right: width - width * 0.92,
      }}
    >
      {warning ? (
        <Ionicons name="warning-outline" size={40} color="#f0b30c" />
      ) : (
        <Ionicons
          name="checkmark-circle-outline"
          size={40}
          color={globalStyles.colors.primary[700]}
        />
      )}
      <Text className="text-center" style={{ width: width * 0.5 }}>
        {text}
      </Text>
      <PrimaryButton
        onPress={onPress}
        text={buttonText}
        backGroundColor="#0F5CB3"
        textColor="white"
      />
    </Animated.View>
  );
};

export default PopUp;
