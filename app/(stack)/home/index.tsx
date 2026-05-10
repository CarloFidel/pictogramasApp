import React from "react";
import { Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" />
      <View className=" bg-primary h-screen flex items-center">
        <View className="bg-primary-600 px-8 py-2 mt-10 mb-5 rounded-3xl">
          <Pressable>
            <Text className="text-white text-2xl">+</Text>
          </Pressable>
        </View>
        <Text className="text-white text-md font-hank-regular w-40 text-center">
          Empieza añadiendo un pictograma
        </Text>
        <View className="w-8 h-screen bg-primary-400 rounded-lg mt-5"></View>
      </View>
    </SafeAreaView>
  );
}
