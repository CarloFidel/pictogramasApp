import NavegationBar from "@/comoponents/NavegationBar";
import React from "react";
import { Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

let renderBurronsFlag = true;

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" />

      <View className=" bg-primary h-screen flex items-center">
        <View className="flex-row gap-8 bg-primary-600 px-8 py-4 mt-10 mb-5 rounded-3xl shadow-md shadow-primary-600">
          <Pressable>
            <Feather name="plus" size={24} color="white" />
          </Pressable>
          {renderBurronsFlag && (
            <>
              <Pressable>
                <SimpleLineIcons
                  name="pencil"
                  size={18}
                  color="white"
                  className="mt-1"
                />
              </Pressable>
              <Pressable>
                <Feather name="play" size={20} color="white" className="mt-1" />
              </Pressable>
            </>
          )}
        </View>
        {!renderBurronsFlag && (
          <Text className="text-white text-md font-hank-regular w-40 text-center">
            Empieza añadiendo un pictograma
          </Text>
        )}

        <View className="w-8 h-full bg-primary-400 rounded-lg mt-5"></View>
        <View className="fixed bottom-1/3 z-10 shadow-md shadow-primary-700">
          <NavegationBar></NavegationBar>
        </View>
      </View>
    </SafeAreaView>
  );
}
