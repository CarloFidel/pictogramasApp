import BlurComponent from "@/common/components/BlurComponent";
import { globalStyles } from "@/global-style";
import HelpIA from "@/modules/IA/components/HelpIA";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
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
  const [isVisibleHelpPopUp, setIsVisibleHelpPopUp] = useState<boolean>(true);

  const { control, errors, onSubmit } = usePropmt();

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            height: height * 0.51,
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
      {isVisibleHelpPopUp && (
        <>
          <BlurComponent />
          <HelpIA
            buttonText="Ok"
            onPress={() => setIsVisibleHelpPopUp(false)}
            text="Ayuda para la IA"
          />
        </>
      )}
    </>
  );
};

export default IAScreen;
