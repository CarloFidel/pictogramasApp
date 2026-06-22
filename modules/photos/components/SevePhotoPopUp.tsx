import PrimaryButton from "@/common/components/PrimaryButton";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

interface Props {
  onCanselPress: () => void;
  onOkPress: () => void;
}

const SavePhotoPopUp = ({ onCanselPress, onOkPress }: Props) => {
  const { width } = useWindowDimensions();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>();

  return (
    <Animated.View
      entering={FadeInDown.springify().duration(400)}
      className="absolute bg-white justify-center items-center p-2 py-8 rounded-xl gap-5 px-5"
      style={{
        top: "20%",
        right: width - width * 0.94,
      }}
    >
      <Text className="text-center" style={{ width: width * 0.5 }}>
        Escriba una palabra que representa la acción de la imagen
      </Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={[styles.input, styles.input, { width: width * 0.8 }]}
              placeholder="Escriba la palabra..."
              keyboardType="default"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
            />
            {errors.title && (
              <Animated.View
                entering={FadeIn}
                className="flex-row justify-start items-center gap-2 mt-2"
              >
                <Feather name="alert-circle" size={18} color={"red"} />
                <Text style={{ color: "red" }} className="text-left">
                  {errors.title?.message}
                </Text>
              </Animated.View>
            )}
          </View>
        )}
      />
      <View className="gap-5 mt-10">
        <PrimaryButton
          onPress={onOkPress}
          text="Save"
          textColor="white"
          backGroundColor="#0F5CB3"
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

export default SavePhotoPopUp;

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  },
});
