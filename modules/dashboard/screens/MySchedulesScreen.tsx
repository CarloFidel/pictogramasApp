import Backbutton from "@/common/components/Backbutton";
import Loading from "@/common/components/loading";
import { useAuthState } from "@/modules/auth/store/authState";
import { router } from "expo-router";
import React, { useRef } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSchedules } from "../hooks/useSchedules";

import Feather from "@expo/vector-icons/Feather";
import Animated, { FadeIn } from "react-native-reanimated";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import PictoInSchedule from "../components/PictoInSchedule";

const MySchedulesScreen = () => {
  const ref = useRef<ICarouselInstance>(null);

  const { token } = useAuthState();
  const { getAllSchedulesQuery } = useSchedules(token);

  const { width, height } = useWindowDimensions();

  const schedulesResponse = getAllSchedulesQuery.data;

  if (getAllSchedulesQuery.isLoading) {
    return <Loading />;
  }

  if (!schedulesResponse || schedulesResponse.schedule.length === 0) {
    return (
      <SafeAreaView
        className="flex-1 w-screen h-screen"
        accessibilityIgnoresInvertColors
      >
        <View className="flex-1 items-center justify-center">
          <Backbutton onPress={() => router.back()} position="top-2 left-5" />
          <Text className="text-3xl mt-20">Mis horarios</Text>
          <Text className="mt-10 text-xl">No tienes horarios para mostrar</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 w-screen h-screen"
      accessibilityIgnoresInvertColors
    >
      <Animated.View
        entering={FadeIn.duration(500)}
        className="flex flex-1 items-start"
      >
        <Backbutton onPress={() => router.back()} position="top-2 left-5" />
        <Text className="text-3xl justify-start mt-20 px-5 w-full">
          Mis horarios
        </Text>
        <FlatList
          horizontal={false}
          refreshControl={
            <RefreshControl
              refreshing={getAllSchedulesQuery.isFetching}
              onRefresh={async () => {
                await getAllSchedulesQuery.refetch();
              }}
            />
          }
          data={schedulesResponse.schedule}
          renderItem={({ item }) => (
            <View
              className="w-full px-5 py-2 border border-gray-300 rounded-lg"
              style={{ marginBottom: 20, width: width }}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-2xl mb-4">{item.title}</Text>
                <View className="flex-row items-center justify-between mb-2 gap-6">
                  <Pressable>
                    <Feather name="play" size={20} color="black" />
                  </Pressable>
                  <Pressable>
                    <Feather name="trash" size={20} color="black" />
                  </Pressable>
                </View>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={item.scheduleItems}
                renderItem={({ item }) => (
                  <PictoInSchedule url={item.visualItem.url} />
                )}
                ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          style={{ marginVertical: 20 }}
          contentContainerStyle={{
            width: width,
            marginVertical: 10,
          }}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default MySchedulesScreen;
