import Loading from "@/common/components/loading";
import PopUp from "@/common/components/PopUp";
import PrimaryButton from "@/common/components/PrimaryButton";
import { globalStyles } from "@/global-style";
import { useAuthState } from "@/modules/auth/store/authState";
import { usePhotos } from "@/modules/photos/hooks/usePhotos";
import { SaveScheduleSchema } from "@/modules/shedules/schema/save-schecule";
import Feather from "@expo/vector-icons/Feather";
import { zodResolver } from "@hookform/resolvers/zod";
import * as axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, useWindowDimensions, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOutDown,
} from "react-native-reanimated";
import { saveEditPhoto } from "../services/axios-EditPhoto";

interface Props {
  photoid: string;
  onCanselPress: () => void;
}

const EditPhotoPopUp = ({ photoid, onCanselPress }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number>();
  const { width } = useWindowDimensions();
  const { token } = useAuthState();

  const { getAllPhotosQuery } = usePhotos(token);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>({ resolver: zodResolver(SaveScheduleSchema) });

  const onSubmit = handleSubmit(async ({ title }) => {
    try {
      setIsLoading(true);
      const res = await saveEditPhoto(title, token, photoid);
      setIsLoading(false);
      setStatusCode(res.status);
      //onCanselPress();
      await getAllPhotosQuery.refetch();
      onCanselPress();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setStatusCode(error.response?.data.statusCode);
      }
    } finally {
      setIsLoading(false);
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  if (statusCode === 200) {
    return (
      <PopUp
        onPress={onCanselPress}
        buttonText="OK"
        text="Foto actualizada con éxito"
      />
    );
  }
  if (statusCode === 400) {
    return (
      <PopUp
        onPress={onCanselPress}
        buttonText="OK"
        text="Algo ha salido mal, lo sentimos"
        warning={true}
      />
    );
  }

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
      <Text className="text-center" style={{ width: width * 0.5 }}>
        Escriba la nueva palabra para la foto
      </Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={[globalStyles.input, { width: width * 0.8 }]}
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

export default EditPhotoPopUp;
