import useButtonPress from "@/animations/useButtonPress";
import Backbutton from "@/components/shared/Backbutton";
import { globalStyles } from "@/global-style";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const handleToRegister = () => {
    router.push("/register");
  };

  const handleOnpress = () => {
    console.log("back-press");
  };

  const { width, height } = useWindowDimensions();

  const { pressedStyle, tapGesture } = useButtonPress();

  return (
    <>
      <KeyboardAvoidingView behavior="padding" className="flex-1 bg-white">
        <View
          className={"flex-1 bg-white justify-between items-center pb-10 mt-4"}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Backbutton onPress={handleOnpress}></Backbutton>
            <Text
              className="w-full justify-left text-3xl mt-5"
              style={{ marginTop: height * 0.12 }}
            >
              Iniciar sesión con email
            </Text>
            <View
              style={{ height: height * 0.33, gap: 20 }}
              className="justify-center items-center w-full"
            >
              <TextInput
                style={[styles.input, styles.input, { width: width * 0.9 }]}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              ></TextInput>
              <View className="relative">
                <TextInput
                  style={[styles.input, styles.input, { width: width * 0.9 }]}
                  placeholder="Contraseña"
                  secureTextEntry={!isVisible ? true : false}
                ></TextInput>

                <Pressable
                  onPress={() => setIsVisible((prev) => !prev)}
                  className="absolute right-4 top-5"
                >
                  {isVisible ? (
                    <Feather name="eye" size={18} color={"gray"} />
                  ) : (
                    <Feather name="eye-off" size={18} color={"gray"} />
                  )}
                </Pressable>
              </View>
              <GestureDetector gesture={tapGesture}>
                <Animated.View style={pressedStyle}>
                  <Pressable
                    style={[
                      styles.button,
                      globalStyles.shadow_md,
                      { marginTop: 40, width: width * 0.85 },
                    ]}
                  >
                    <Text className="text-white ">Confirmar</Text>
                    <Feather
                      name="arrow-right-circle"
                      color={"white"}
                      size={15}
                    ></Feather>
                  </Pressable>
                </Animated.View>
              </GestureDetector>
            </View>
          </ScrollView>
          <Pressable onPress={handleToRegister} className="flex-row">
            <Text className="white">¿No tienes una cuenta?</Text>
            <Text className="text-primary-600"> Register</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    width: 360,
    height: 50,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  },

  button: {
    width: 360,
    height: 55,
    backgroundColor: "#0F5CB3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});
