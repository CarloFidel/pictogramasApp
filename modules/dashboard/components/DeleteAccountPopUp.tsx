import PrimaryButton from "@/common/components/PrimaryButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

interface Props {
  onOkPress: () => void;
  onCanselPress: () => void;
}

const DeleteAccountPopUp = ({ onOkPress, onCanselPress }: Props) => {
  const { width } = useWindowDimensions();

  return (
    <Animated.View
      entering={FadeInDown.springify().duration(400)}
      exiting={FadeOutDown.springify().duration(100)}
      className="absolute bg-white justify-center items-center p-2 py-8 rounded-xl gap-5 px-5"
      style={{
        top: "20%",
        right: width - width * 0.94,
      }}
    >
      <Ionicons name="warning-outline" size={30} color="black" />
      <Text className="text-center" style={{ width: width * 0.5 }}>
        Seguro quiere elimiar su cuenta ?
      </Text>
      <View className="gap-5">
        <PrimaryButton
          onPress={onOkPress}
          text="Ok"
          textColor="white"
          backGroundColor="#EB512F"
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

export default DeleteAccountPopUp;
