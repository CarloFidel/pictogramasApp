import PrimaryButton from "@/common/components/PrimaryButton";
import { globalStyles } from "@/global-style";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

interface Props {
  text: string;

  onOkPress: () => void;
  onCanselPress: () => void;
}

const DeletePopUp = ({ text, onOkPress, onCanselPress }: Props) => {
  const { width, height } = useWindowDimensions();

  return (
    <Animated.View
      entering={FadeInDown.springify().duration(400)}
      exiting={FadeOutDown.springify().duration(100)}
      className="absolute bg-white justify-center items-center p-2 py-8 rounded-3xl gap-5 px-5"
      style={{
        top: height * 0.3,
        right: width - width * 0.94,
        opacity: 0.9,
        zIndex: 11,
      }}
    >
      <Ionicons name="warning-outline" size={30} color="black" />
      <Text className="text-center" style={{ width: width * 0.5 }}>
        {text}
      </Text>
      <View className="gap-5">
        <PrimaryButton
          onPress={onOkPress}
          text="Ok"
          textColor="white"
          backGroundColor={globalStyles.colors.warning}
        />
        <PrimaryButton
          onPress={onCanselPress}
          text="Cancel"
          textColor="black"
          backGroundColor="#CECECE"
        />
      </View>
    </Animated.View>
  );
};

export default DeletePopUp;
