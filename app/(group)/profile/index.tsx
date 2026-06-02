import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Text, View } from "react-native";

const Profile = () => {
  return (
    <View className=" bg-primary-600">
      <View className="items-starttext-lg mt-20 mb-10 px-5 gap-2">
        <Text className="text-white font-hank-light text-3xl mt-10">
          User.Name
        </Text>
        <Text className="text-white font-hank-light text-md">
          user@gmail.com
        </Text>
      </View>
      <View className="px-2 bg-white rounded-t-3xl ">
        <View className="p-5 gap-4 ">
          <Text className="text-gray-500 font-hank-regular text-2xl ">
            Cuenta
          </Text>
          <View className="flex flex-row gap-5 items-center">
            <Feather name="user" size={20} />
            <Text className="text-black font-hank-regular text-md">
              Información personal
            </Text>
            <Feather name="chevron-right" size={15} />
          </View>
          <View className="flex flex-row gap-5 items-center">
            <Feather name="image" size={20} />
            <Text className="text-black font-hank-regular text-md">
              Mis fotos
            </Text>
            <Feather name="chevron-right" size={15} />
          </View>
          <View className="flex flex-row gap-5 items-center">
            <Feather name="book" size={20} />
            <Text className="text-black font-hank-regular text-md">
              Artículos guardados
            </Text>
            <Feather name="chevron-right" size={15} />
          </View>
          <View className="flex flex-row gap-5 items-center">
            <Feather name="calendar" size={20} />
            <Text className="text-black font-hank-regular text-md">
              Mis horarios
            </Text>
            <Feather name="chevron-right" size={15} />
          </View>
        </View>
        <View className="p-5 gap-4">
          <Text className="text-gray-500 font-hank-regular text-2xl">
            Ayuda
          </Text>

          <View className="flex flex-row gap-5 items-center">
            <Feather name="help-circle" size={20} />
            <Text className="text-black font-hank-regular text-md">
              Preguntas frecuentes
            </Text>
            <Feather name="chevron-right" size={15} />
          </View>
          <View className="flex flex-row gap-5 items-center">
            <Feather name="align-left" size={20} />
            <Text className="text-black font-hank-regular text-md">
              Sobre esta App
            </Text>
            <Feather name="chevron-right" size={15} />
          </View>
        </View>
        <View className="p-5 gap-4">
          <Text className="text-gray-500 font-hank-regular text-2xl">
            Preferencias
          </Text>

          <View className="flex flex-row gap-5 items-center">
            <Feather name="type" size={20} />
            <Text className="text-black font-hank-regular text-md">
              Idiomas
            </Text>
            <Feather name="chevron-right" size={15} />
          </View>
          <View className="flex flex-row gap-5  items-center">
            <Feather name="moon" size={20} />
            <Text className="text-black font-hank-regular text-md">Tema</Text>
          </View>
        </View>
        <View className="flex flex-row ml-5 mt-10 gap-4 items-center">
          <Feather name="arrow-right-circle" size={20} color="red" />
          <Text className="font-hank-regular text-md text-red-600">Logout</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;
