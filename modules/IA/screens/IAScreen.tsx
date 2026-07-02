import Loading from "@/common/components/loading";
import { globalStyles } from "@/global-style";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Controller } from "react-hook-form";
import {
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

const IAScreen = () => {
  const { width, height } = useWindowDimensions();

  const {
    control,
    errors,
    response,
    resError,
    setResponse,
    isLoading,
    onSubmit,
    setIsLoading,
    setResError,
  } = usePropmt();

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
