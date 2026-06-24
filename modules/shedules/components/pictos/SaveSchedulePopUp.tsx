import PrimaryButton from "@/common/components/PrimaryButton";
import { globalStyles } from "@/global-style";
import { useAuthState } from "@/modules/auth/store/authState";
import Feather from "@expo/vector-icons/Feather";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, useWindowDimensions, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOutDown,
} from "react-native-reanimated";
import { SheduleItems } from "../../interfaces/save-schedules.interfaces";
import { SaveScheduleSchema } from "../../schema/save-schecule";
import { saveSchedule } from "../../services/axios-pictograms";

interface Props {
  items: SheduleItems[];
  onCanselPress: () => void;
  onOkPress: () => void;
}

const SaveSchedulePopUp = ({ items, onCanselPress }: Props) => {
  const { width } = useWindowDimensions();
  const { token } = useAuthState();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>({ resolver: zodResolver(SaveScheduleSchema) });

  const onSubmit = handleSubmit(async ({ title }) => {
    try {
      const res = await saveSchedule({ title, token, items });

      console.log(res);
    } catch (error) {
      throw error;
    }
  });

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
        Escriba un título para el horario
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

export default SaveSchedulePopUp;
