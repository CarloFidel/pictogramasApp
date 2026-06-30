import { globalStyles } from "@/global-style";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    TextInput,
    useWindowDimensions,
    View,
} from "react-native";

const IAScreen = () => {
  const { width, height } = useWindowDimensions();

  return (
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
          <TextInput
            placeholder="Escribe una acción..."
            style={{
              ...globalStyles.input,
              width: width * 0.75,
              height: height * 0.055,
              alignItems: "center",
            }}
          />
          <Pressable
            style={{
              backgroundColor: globalStyles.colors.primary[500],
              borderRadius: 50,
              padding: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="send-outline" size={18} color="white" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default IAScreen;
