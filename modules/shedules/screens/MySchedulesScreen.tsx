import Backbutton from "@/common/components/Backbutton";
import Loading from "@/common/components/loading";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BlurComponent from "@/common/components/BlurComponent";
import PopUp from "@/common/components/PopUp";
import { useAuthState } from "@/modules/auth/store/authState";
import DeletePopUp from "@/modules/dashboard/components/DeletePopUp";
import PictoInSchedule from "@/modules/dashboard/components/PictoInSchedule";
import { useDeleteSchedule } from "@/modules/dashboard/hooks/useDeleteSchedule";
import useLoadSchedule from "@/modules/dashboard/hooks/useLoadSchedule";
import { useSchedules } from "@/modules/dashboard/hooks/useSchedules";
import Feather from "@expo/vector-icons/Feather";
import Animated, { FadeIn } from "react-native-reanimated";

const MySchedulesScreen = () => {
  const { token } = useAuthState();
  const { width, height } = useWindowDimensions();

  const { getAllSchedulesQuery } = useSchedules(token);
  const schedulesResponse = getAllSchedulesQuery.data;

  const {
    isLoading,
    statusCode,
    openDeleteSchedulePopUp,

    handleDeleteOpenPopUp,
    handleDeleteSchedule,
    setOpenDeleteSchedulePopUp,
  } = useDeleteSchedule();

  const { handleSetPictosOn } = useLoadSchedule();

  const handleClosingPopUp = async () => {
    setOpenDeleteSchedulePopUp(false);
    await getAllSchedulesQuery.refetch();
  };

  if (getAllSchedulesQuery.isLoading) {
    return <Loading />;
  }

  if (!schedulesResponse || schedulesResponse.schedule.length === 0) {
    return (
      <SafeAreaView
        className="flex-1 w-screen h-screen"
        accessibilityIgnoresInvertColors
      >
        <View className="flex-1 items-center mb-30">
          <Backbutton onPress={() => router.back()} position="top-2 left-5" />
          <Text className="text-3xl w-full text-start p-6 mt-20">
            Mis horarios
          </Text>
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
        className="flex items-start"
        style={{ height: height * 0.8 }}
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
              className="px-5 py-2 border border-gray-300 rounded-lg"
              style={{ marginBottom: 20, width: width }}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-2xl mb-4">
                  {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                </Text>
                <View className="flex-row items-center justify-between mb-2 gap-6">
                  <Pressable onPress={() => handleSetPictosOn(item.id)}>
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
                  <PictoInSchedule
                    url={item.visualItem.url}
                    dimention="w-20 h-20"
                  />
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
              text="Su horario se ha eliminado con éxito"
              buttonText="Ok"
              warning={false}
              onPress={handleClosingPopUp}
            />
          )}
          {!isLoading && statusCode !== 200 && (
            <DeletePopUp
              text="Seguro que quiere eliminar este horario?"
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
