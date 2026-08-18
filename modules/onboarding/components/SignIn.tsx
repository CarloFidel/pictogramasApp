import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

interface Props {
  onGoogle: () => void;
  onMail: () => void;
  onClose: () => void;
}

const SignIn = ({ onGoogle, onMail, onClose }: Props) => {
  const { width, height } = useWindowDimensions();
  return (
    <Animated.View
      entering={FadeInDown.springify().duration(800).delay(300)}
      exiting={FadeOutDown.springify().duration(500)}
      className="justify-start items-center px-4 py-10 gap-10 bg-white"
      style={{
        position: "absolute",
        left: width * 0.05,
        top: height * 0.38,
        width: width * 0.9,
        borderRadius: 10,
        padding: 10,
        zIndex: 11,
      }}
    >
      <Pressable
        style={{ position: "absolute", top: 10, right: 15 }}
        onPress={onClose}
      >
        <Ionicons name="close-outline" size={30} color={"black"} />
      </Pressable>
      <Text className="text-3xl font-hank-regular w-full text-center">
        Iniciar sesión
      </Text>
      <View className="justify-center items-center gap-4 mt-4">
        <Pressable
          style={{
            width: width * 0.8,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 18,
            borderRadius: 10,
            flexDirection: "row",
            gap: 10,
          }}
          onPress={() => onGoogle()}
        >
          <Image
            source={require("@/modules/onboarding/assets/icons8-google-48.png")}
            style={{
              width: 20,
              height: 20,
              resizeMode: "contain",
            }}
          />
          <Text style={{ color: "white" }}>Continuar con google</Text>
        </Pressable>
        <Pressable
          style={{
            width: width * 0.8,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 18,
            borderRadius: 10,
            flexDirection: "row",
            gap: 10,
            borderWidth: 1,
            borderColor: "black",
          }}
          onPress={onMail}
        >
          <Ionicons name="mail-outline" size={20} color="black" />
          <Text style={{ color: "black" }}>Continuar con email</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default SignIn;
