import Backbutton from "@/common/components/Backbutton";
import Loading from "@/common/components/loading";
import { useAuthState } from "@/modules/auth/store/authState";
import { router } from "expo-router";
import React from "react";
import {
    FlatList,
    RefreshControl,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSchedules } from "../hooks/useSchedules";

const MySchedulesScreen = () => {
  const { token } = useAuthState();
  const { getAllSchedulesQuery } = useSchedules(token);

  const { width, height } = useWindowDimensions();

  const data = getAllSchedulesQuery.data?.schedule ?? [];

  if (getAllSchedulesQuery.isLoading) {
    return <Loading />;
  }

  console.log(data);

  return (
    <View className="flex flex-1 items-center">
      <SafeAreaView>
        <Text className="text-3xl justify-start bg-red-700">Mis horarios</Text>
      </SafeAreaView>
      <Backbutton onPress={() => router.back()} position="top-20 left-10" />

      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        className="flex-1 justify-center items-center"
        style={{ width: width, height: height }}
      >
        <Text className="mb-40 text-xl">No tienes horarios para mostrar</Text>
      </Animated.View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={getAllSchedulesQuery.isFetching}
            onRefresh={async () => {
              await getAllSchedulesQuery.refetch();
            }}
          />
        }
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        className="h-3/4"
      />
    </View>
  );
};

export default MySchedulesScreen;
