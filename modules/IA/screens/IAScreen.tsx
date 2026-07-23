import Loading from "@/common/components/loading";
import PrimaryButton from "@/common/components/PrimaryButton";
import { globalStyles } from "@/global-style";
import PictoInSchedule from "@/modules/dashboard/components/PictoInSchedule";
import { SheduleItems } from "@/modules/shedules/interfaces/save-schedules.interfaces";
import { transformCapitalize } from "@/modules/shedules/utility/transformCapitalize";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { usePropmt } from "../hooks/usePropmpt";

interface Props {
  onError: (error: boolean) => void;
  onSave: (save: boolean, items: SheduleItems[]) => void;
}
const IAScreen = ({ onError, onSave }: Props) => {
  const [, setShceduleItemsforSave] = useState<SheduleItems[]>([]);

  const { width, height } = useWindowDimensions();

  const {
    title,
    control,
    errors,
    response,
    resError,
    isLoading,
    onSubmit,
    setResError,
  } = usePropmt();

  useEffect(() => {
    if (resError) {
      onError(true);
      setResError("");
    }
  }, [onError, resError, setResError]);

  const handleSave = () => {
    const sheduleItems: SheduleItems[] = response.map((item, index) => ({
      position: index,
      visualitem: {
        url: item.imageUrl,
        type: item.isPhoto ? "picto" : "photo",
        word: item.keyword,
      },
    }));
    setShceduleItemsforSave(sheduleItems);
    onSave(true, sheduleItems);
  };

  const handleClose = () => {
    onSave(false, []);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {isLoading && <Loading />}
        <View
          style={{
            justifyContent: "flex-start",
            paddingHorizontal: 10,
            gap: 10,
            height: response.length > 0 ? height * 0 : height * 0.6,
          }}
          className="flex-col items-center justify-center mt-5"
        >
          {response.length <= 0 && (
            <View className="flex-row gap-4 justify-center items-center mt-18">
              <Controller
                control={control}
                name="action"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <TextInput
                      style={{
                        ...globalStyles.input,
                        width: width * 0.75,
                        height: height * 0.055,
                        alignItems: "center",
                        borderRadius: 40,
                        paddingHorizontal: 20,
                      }}
                      placeholder="Escriba una acción..."
                      keyboardType="default"
                      autoCapitalize="sentences"
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.action && (
                      <Animated.View
                        entering={FadeIn}
                        className="flex-row justify-start items-center gap-2 mt-2"
                      >
                        <Feather name="alert-circle" size={18} color={"red"} />
                        <Text style={{ color: "red" }} className="text-left">
                          {errors.action.message!}
                        </Text>
                      </Animated.View>
                    )}
                  </View>
                )}
              />

              <Pressable
                style={{
                  backgroundColor: globalStyles.colors.primary[500],
                  borderRadius: 50,
                  padding: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={onSubmit}
              >
                <Ionicons name="send-outline" size={18} color="white" />
              </Pressable>
            </View>
          )}

          {response.length <= 0 && (
            <>
              <AntDesign
                name="robot"
                size={40}
                color={globalStyles.colors.gray16}
                style={{ marginTop: 20 }}
              />
              <Text className="text-gray-400 italic text-center mt-30">
                {`Soy el agente de IA para esta app. Si lo deseas te puedo proporcionar un horario visual. Solo tienes que indicar una acción, por ejemplo: "Ir a la escuela"`}
              </Text>
            </>
          )}
        </View>

        {response.length > 0 && (
          <Animated.View
            entering={FadeInDown.duration(500).delay(200)}
            style={{
              width: width * 0.93,
              height: height * 0.65,
              alignItems: "center",
              borderWidth: 1,
              borderColor: globalStyles.colors.gray04,
              borderRadius: 10,
              padding: 10,
              gap: 10,
            }}
          >
            <View className="flex-row items-center justify-between w-full mb-2">
              <Text className="text-2xl color-slate-700">
                {transformCapitalize(title)}
              </Text>
              <Pressable onPress={handleClose}>
                <Ionicons name="close" size={20} color="black" />
              </Pressable>
            </View>
            <View
              style={{
                width: width * 0.07,
                height: height * 0.47,

                backgroundColor: globalStyles.colors.primary[500],
                borderRadius: 5,
                paddingVertical: 8,
              }}
            ></View>

            <FlatList
              horizontal={false}
              style={{
                position: "absolute",
                height: height * 0.45,
                width: width * 0.8,
                marginTop: 60,
              }}
              showsVerticalScrollIndicator={false}
              data={response}
              contentContainerStyle={{
                alignItems: "center",
                paddingBottom: 20,
              }}
              renderItem={({ item, index }) => (
                <Animated.View
                  entering={FadeInDown.duration(500).delay(index * 100)}
                  className="flex-row items-center justify-between w-full"
                >
                  <PictoInSchedule url={item.imageUrl} dimention="w-24 h-24" />
                </Animated.View>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
            />

            <PrimaryButton
              onPress={handleSave}
              text="Guardar"
              textColor={globalStyles.colors.gray04}
              backGroundColor={globalStyles.colors.primary[500]}

              iconColor={globalStyles.colors.gray04}
            />
          </Animated.View>
        )}

        <View
          style={{
            height: height * 0.4,
            justifyContent: "flex-end",
            paddingHorizontal: 10,
          }}
        ></View>
      </KeyboardAvoidingView>
    </>
  );
};

export default IAScreen;
