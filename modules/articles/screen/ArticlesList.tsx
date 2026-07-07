import Backbutton from "@/common/components/Backbutton";
import { router } from "expo-router";
import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ArticlesList = () => {
  const { height } = useWindowDimensions();

  return (
    <>
      <SafeAreaView
        className="flex-1 w-screen h-screen bg-white"
        accessibilityIgnoresInvertColors
      >
        <Backbutton
          position={"top-20 left-6 z-10"}
          onPress={() => router.back()}
        />

        <View
          className="flex-1 items-center px-6"
          style={{ marginTop: height * 0.08 }}
        >
          <Text className="text-3xl w-full text-start">Artículos</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ArticlesList;
