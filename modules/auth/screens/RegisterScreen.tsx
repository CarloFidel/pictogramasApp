import useButtonPress from "@/animations/useButtonPress";
import Backbutton from "@/common/components/Backbutton";
import { globalStyles } from "@/global-style";
import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
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
import Animated, { FadeIn } from "react-native-reanimated";

import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { width, height } = useWindowDimensions();

  const { control, errors, onSubmit, router } = useRegister();

  const handleToRegister = () => {
    router.replace("/login");
  };

  const handleOnpress = () => {
    console.log("back-press");
    router.back();
  };

  const { pressedStyle, tapGesture } = useButtonPress();

  return (
    <>
      <KeyboardAvoidingView behavior="padding" className="flex-1 bg-white">
        <View
          className={"flex-1 bg-white justify-between items-center pb-10 mt-4"}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Backbutton
              position={"top-10 left-2"}
              onPress={handleOnpress}
            ></Backbutton>
            <Text
              className="w-full justify-left text-3xl mt-10 mb-2"
              style={{ marginTop: height * 0.12 }}
            >
              Registro
            </Text>
            <View
              style={{ height: height * 0.5, gap: 20 }}
              className="justify-center items-center w-full"
            >
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <TextInput
                      style={[styles.input, { width: width * 0.9 }]}
                      placeholder="Nombre"
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.name && (
                      <Animated.View
                        entering={FadeIn}
                        className="flex-row justify-start items-center gap-2 mt-2"
                      >
                        <Feather name="alert-circle" size={18} color={"red"} />
                        <Text style={{ color: "red" }} className="text-left">
                          {errors.name.message!}
                        </Text>
                      </Animated.View>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <TextInput
                      style={[styles.input, { width: width * 0.9 }]}
                      placeholder="Apellido"
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.lastName && (
                      <Animated.View
                        entering={FadeIn}
                        className="flex-row justify-start items-center gap-2 mt-2"
                      >
                        <Feather name="alert-circle" size={18} color={"red"} />
                        <Text style={{ color: "red" }} className="text-left">
                          {errors.lastName.message!}
                        </Text>
                      </Animated.View>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <TextInput
                      style={[
                        styles.input,
                        styles.input,
                        { width: width * 0.9 },
                      ]}
                      placeholder="Email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.email && (
                      <Animated.View
                        entering={FadeIn}
                        className="flex-row justify-start items-center gap-2 mt-2"
                      >
                        <Feather name="alert-circle" size={18} color={"red"} />
                        <Text style={{ color: "red" }} className="text-left">
                          {errors.email.message!}
                        </Text>
                      </Animated.View>
                    )}
                  </View>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <View className="relative">
                    <TextInput
                      style={[
                        styles.input,
                        styles.input,
                        { width: width * 0.9 },
                      ]}
                      placeholder="Contraseña"
                      secureTextEntry={!isVisible ? true : false}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.password && (
                      <Animated.View
                        entering={FadeIn}
                        style={{ width: width * 0.9 }}
                        className="flex-row justify-start items-center gap-2 mt-2"
                      >
                        <Feather name="alert-circle" size={18} color={"red"} />
                        <Text style={{ color: "red" }} className="text-left">
                          {errors.password.message!}
                        </Text>
                      </Animated.View>
                    )}
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
                )}
              />

              <GestureDetector gesture={tapGesture}>
                <Animated.View style={pressedStyle}>
                  <Pressable
                    style={[
                      styles.button,
                      globalStyles.shadow_sm,
                      { marginVertical: 10, width: width * 0.85 },
                    ]}
                    onPress={onSubmit}
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
            <Text className="white">¿Tienes una cuenta?</Text>
            <Text className="text-primary-600"> Login</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default Register;

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
