import Loading from "@/common/components/loading";
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
import Animated, { FadeIn } from "react-native-reanimated";
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

  console.log(response);

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
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ height: height * 0.55, justifyContent: "flex-end" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {isLoading && <Loading />}
        <View
          style={{ flex: 1, justifyContent: "flex-end", paddingHorizontal: 10 }}
          className="flex-col items-center justify-center mt-5 h-36"
        >
          <AntDesign
            name="robot"
            size={40}
            color={globalStyles.colors.gray16}
          />

          <Text className="text-gray-400 italic text-center mt-3">
            {`Soy el agente de IA para esta app. Si lo deseas te puedo proporcionar un horario visual. Solo tienes que indicar una acción, por ejemplo: "Ir a la escuela"`}
          </Text>
        </View>
        {response.length > 0 && (
          <View>
            <Animated.View
              entering={FadeIn.duration(500).delay(200)}
              className="w-full px-5 py-2 rounded-lg"
              style={{
                marginBottom: 20,
                width: width * 0.93,
                justifyContent: "center",
                borderWidth: 1,
                borderColor: globalStyles.colors.gray16,
              }}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-2xl">{transformCapitalize(title)}</Text>
                <View className="flex-row gap-4">
                  <Pressable onPress={handleSave}>
                    <Feather name="save" size={20} color="black" />
                  </Pressable>
                </View>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={response}
                renderItem={({ item }) => (
                  <PictoInSchedule url={item.imageUrl} dimention="w-14 h-14" />
                )}
                ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
              />
            </Animated.View>
          </View>
        )}

        <View
          style={{
            height: height * 0.4,
            justifyContent: "flex-end",
            paddingHorizontal: 10,
          }}
        >
          <View className="flex-row gap-4 justify-center items-center">
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
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
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
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default IAScreen;
