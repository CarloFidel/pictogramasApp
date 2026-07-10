import Loading from "@/common/components/loading";
import PopUp from "@/common/components/PopUp";
import PrimaryButton from "@/common/components/PrimaryButton";
import { useAuthState } from "@/modules/auth/store/authState";
import Feather from "@expo/vector-icons/Feather";
import { zodResolver } from "@hookform/resolvers/zod";
import * as axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { SavePhotoSchema } from "../schema/scheme-picture";
import { savePhoto } from "../services/photo.service";

interface Props {
  photo: string;
  onCanselPress: () => void;
  onOkPress: () => void;
}

interface SavePhotData {
  word: string;
}

const SavePhotoPopUp = ({ onCanselPress, onOkPress, photo }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number>();

  const { width } = useWindowDimensions();
  const { token } = useAuthState();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SavePhotData>({ resolver: zodResolver(SavePhotoSchema) });

  const onSubmit = handleSubmit(async ({ word }) => {
    try {
      setIsLoading(true);
      const res = await savePhoto({ picture: photo, word, token });
      setIsLoading(false);
      setStatusCode(res.status);

      //onOkPress();
      return;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setStatusCode(error.response?.data.statusCode);
      }
    } finally {
      setIsLoading(false);
    }
  });

  if (isLoading) {
    return <Loading />;
  }
  if (statusCode === 201) {
    return (
      <PopUp
        onPress={onCanselPress}
        buttonText="OK"
        text="Foto guardada con éxito"
      />
    );
  }
  return (
    <Animated.View
      entering={FadeInDown.springify().duration(400)}
      className="absolute bg-white justify-center items-center p-2 py-8 rounded-xl gap-5 px-5"
      style={{
        top: "20%",
        right: width - width * 0.94,
        opacity: 0.8,
      }}
    >
      <Text className="text-center text-xl" style={{ width: width * 0.5 }}>
        Escriba una palabra que representa la acción de la imagen
      </Text>
      <Controller
        control={control}
        name="word"
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
            {errors.word && (
              <Animated.View
                entering={FadeIn}
                className="flex-row justify-start items-center gap-2 mt-2"
              >
                <Feather name="alert-circle" size={18} color={"red"} />
                <Text style={{ color: "red" }} className="text-left">
                  {errors.word?.message}
                </Text>
              </Animated.View>
            )}
          </View>
        )}
      />
      <View className="gap-5 mt-10">
        <PrimaryButton
          onPress={onSubmit}
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
