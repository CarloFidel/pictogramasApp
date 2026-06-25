import Backbutton from "@/common/components/Backbutton";
import Loading from "@/common/components/loading";
import { useAuthState } from "@/modules/auth/store/authState";
import { router } from "expo-router";
import React, { useState } from "react";
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

import BlurComponent from "@/common/components/BlurComponent";
import PopUp from "@/common/components/PopUp";
import Feather from "@expo/vector-icons/Feather";
import Animated, { FadeIn } from "react-native-reanimated";
import DeleteSchedulePopUp from "../components/DeleteSchedulePopUp";
import PictoInSchedule from "../components/PictoInSchedule";
import { deleteSchedule } from "../services/axios-UserSchedules";

const MySchedulesScreen = () => {
  const [openDeleteSchedulePopUp, setOpenDeleteSchedulePopUp] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number>(0);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(
    null,
  );
  const { token } = useAuthState();
  const { getAllSchedulesQuery } = useSchedules(token);

  const { width } = useWindowDimensions();

  const schedulesResponse = getAllSchedulesQuery.data;

  if (getAllSchedulesQuery.isLoading) {
    return <Loading />;
  }

  const handleDeleteOpenPopUp = (id: string) => {
    setSelectedScheduleId(id);
    setStatusCode(0);
    setOpenDeleteSchedulePopUp(true);
  };

  const handleDeleteSchedule = async () => {
    if (!selectedScheduleId) return;

    try {
      setIsLoading(true);
      const res = await deleteSchedule(token, selectedScheduleId);
      setStatusCode(res?.status ?? 200);
      await getAllSchedulesQuery.refetch();
    } catch (error) {
      console.error(error);
      setStatusCode(500);
    } finally {
      setIsLoading(false);
    }
  };

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
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeIn.duration(500).delay(index * 200)}
              className="w-full px-5 py-2 border border-gray-300 rounded-lg"
              style={{ marginBottom: 20, width: width }}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-2xl mb-4">
                  {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                </Text>
                <View className="flex-row items-center justify-between mb-2 gap-6">
                  <Pressable>
                    <Feather name="play" size={20} color="black" />
                  </Pressable>
                  <Pressable onPress={() => handleDeleteOpenPopUp(item.id)}>
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
            </Animated.View>
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
      {openDeleteSchedulePopUp && (
        <>
          <BlurComponent />
          {isLoading && <Loading />}
          {statusCode === 200 && (
            <PopUp
              text="Su hprario se ha eliminado con éxito"
              buttonText="Ok"
              warning={false}
              onPress={() => setOpenDeleteSchedulePopUp(false)}
            />
          )}
          {!isLoading && statusCode !== 200 && (
            <DeleteSchedulePopUp
              onOkPress={handleDeleteSchedule}
              onCanselPress={() => setOpenDeleteSchedulePopUp(false)}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default MySchedulesScreen;
