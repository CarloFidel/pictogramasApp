import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useAuthState } from "../store/authState";

//import * as SecureStore from "expo-secure-store";
//console.log(SecureStore.getItem("auth-store"));

const ProfileScreen = () => {
  const { email, name, logOut, token } = useAuthState();

  return (
    <View className=" bg-primary-600">
      <View className="items-starttext-lg mt-20 mb-10 px-5 gap-2">
        <Text className="text-white font-hank-light text-3xl mt-10">
          {name}
        </Text>
        <Text className="text-white font-hank-light text-md">{email}</Text>
      </View>
      <View className="px-2 bg-white rounded-t-3xl ">
        <View className="p-5 gap-4 ">
          <Text className="text-gray-500 font-hank-regular text-2xl ">
            Cuenta
          </Text>
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row gap-5 items-center">
              <Feather name="user" size={20} />
              <Text className="text-black font-hank-regular text-md">
                Información personal
              </Text>
            </View>
            <Feather name="chevron-right" size={15} />
          </View>
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row gap-5 items-center">
              <Feather name="image" size={20} />
              <Text className="text-black font-hank-regular text-md">
                Mis fotos
              </Text>
            </View>
            <Feather name="chevron-right" size={15} />
          </View>
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row gap-5 items-center">
              <Feather name="book" size={20} />
              <Text className="text-black font-hank-regular text-md">
                Artículos guardados
              </Text>
            </View>
            <Feather name="chevron-right" size={15} />
          </View>
          <View className="flex flex-row gap-5 items-center justify-between">
            <View className="flex flex-row gap-5 items-center">
              <Feather name="calendar" size={20} />
              <Text className="text-black font-hank-regular text-md">
                Mis horarios
              </Text>
            </View>
            <Feather name="chevron-right" size={15} />
          </View>
        </View>

        <View className="p-5 gap-4">
          <Text className="text-gray-500 font-hank-regular text-2xl">
            Ayuda
          </Text>

          <View className="flex flex-row gap-5 items-center justify-between">
            <View className="flex flex-row gap-5 items-center">
              <Feather name="help-circle" size={20} />
              <Text className="text-black font-hank-regular text-md">
                Preguntas frecuentes
              </Text>
            </View>
            <Feather name="chevron-right" size={15} />
          </View>
          <View className="flex flex-row gap-5 items-center justify-between">
            <View className="flex flex-row gap-5 items-center">
              <Feather name="align-left" size={20} />
              <Text className="text-black font-hank-regular text-md">
                Sobre esta App
              </Text>
            </View>
            <Feather name="chevron-right" size={15} />
          </View>
        </View>

        <View className="p-5 gap-4">
          <Text className="text-gray-500 font-hank-regular text-2xl">
            Preferencias
          </Text>

          <View className="flex flex-row gap-5 items-center justify-between">
            <View className="flex flex-row gap-5 items-center">
              <Feather name="type" size={20} />
              <Text className="text-black font-hank-regular text-md">
                Idiomas
              </Text>
            </View>
            <Feather name="chevron-right" size={15} />
          </View>
          <View className="flex flex-row gap-5 items-center justify-between">
            <View className="flex flex-row gap-5 items-center">
              <Feather name="moon" size={20} />
              <Text className="text-black font-hank-regular text-md">Tema</Text>
            </View>
            <Feather name="chevron-right" size={15} />
          </View>
        </View>
        <Pressable onPress={() => logOut()}>
          <View className="flex flex-row ml-5 mt-10 gap-4 items-center">
            <Feather name="arrow-right-circle" size={20} color="red" />
            <Text className="font-hank-regular text-md text-red-600">
              Logout
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;
