import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import {
    AgendaList,
    CalendarProvider,
    ExpandableCalendar,
} from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

import Backbutton from "@/common/components/Backbutton";
import BlurComponent from "@/common/components/BlurComponent";
import PrimaryButton from "@/common/components/PrimaryButton";
import { globalStyles } from "@/global-style";
import { useAuthState } from "@/modules/auth/store/authState";
import PictoInSchedule from "@/modules/dashboard/components/PictoInSchedule";
import { useSchedules } from "@/modules/dashboard/hooks/useSchedules";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import {
    FlatList,
    Pressable,
    RefreshControl,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import SwitchButton from "../components/SwitchButton";

const CalendarScreen = () => {
  const [selected, setSelected] = useState("");
  const [isVisibleSchedules, setIsVisibleSchedules] = useState<boolean>(false);

  const { width, height } = useWindowDimensions();

  const sections = [
    {
      title: "2026-07-02",
      data: [{ title: "Desayuno" }, { title: "Colegio" }],
    },
    {
      title: "2026-07-03",
      data: [{ title: "Terapia" }],
    },
  ];

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const { token } = useAuthState();

  const { getAllSchedulesQuery } = useSchedules(token);
  const schedulesResponse = getAllSchedulesQuery.data;

  /*   if (getAllSchedulesQuery.isLoading) {
    return <Loading />;
  }
 */
  const handleOKPress = () => {};

  return (
    <>
      <StatusBar style="dark" backgroundColor="white" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Backbutton
          position="left-5 top-16"
          onPress={() => {
            router.back();
          }}
        />
        <Pressable
          className="absolute bottom-40 right-10 bg-primary-400 p-3 rounded-full z-50"
          onPress={() => setIsVisibleSchedules(true)}
        >
          <Ionicons name="add" size={30} color="white" />
        </Pressable>

        <CalendarProvider
          date={new Date().toISOString().split("T")[0]}
          style={{
            marginTop: height * 0.06,
          }}
        >
          <ExpandableCalendar
            hideArrows={true}
            closeOnDayPress={true}
            markedDates={{
              [selected]: {
                selected: true,
                selectedColor: globalStyles.colors.primary[400],
                disableTouchEvent: true,
              },
            }}
            theme={{
              selectedDayBackgroundColor: globalStyles.colors.primary[400],
              selectedDayTextColor: "#FFFFFF",
              todayTextColor: globalStyles.colors.primary[600],
              arrowColor: globalStyles.colors.primary[400],
            }}
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
          />

          <AgendaList
            sections={sections}
            renderItem={({ item }) => (
              <View
                style={{
                  padding: 16,
                  backgroundColor: "white",
                  marginBottom: 8,
                }}
              >
                <Text>{item.title}</Text>
              </View>
            )}
          />
        </CalendarProvider>
      </SafeAreaView>

      {isVisibleSchedules && (
        <>
          <BlurComponent />
          <Animated.View
            entering={FadeIn.duration(300).delay(100)}
            exiting={FadeOut.duration(200)}
            className="flex flex-1 items-start bg-white"
            style={{
              width: width * 0.9,
              height: height * 0.65,
              borderRadius: 20,
              position: "absolute",
              top: height * 0.08,
              right: width * 0.05,
              paddingHorizontal: 10,
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 20,
              gap: 10,
            }}
          >
            <Text className="text-3xl text-center mt-10 w-full">
              Mis horarios
            </Text>
            {schedulesResponse ? (
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
                data={schedulesResponse!.schedule}
                renderItem={({ item, index }) => (
                  <Animated.View
                    entering={FadeIn.duration(500).delay(index * 200)}
                    className={"flex-row"}
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: width * 0.8,
                    }}
                  >
                    <View
                      className="w-full px-5 border border-gray-300 rounded-lg"
                      style={{
                        marginBottom: 20,
                        width: width * 0.67,
                        paddingVertical: 10,
                      }}
                    >
                      <View className="flex-row items-center justify-between">
                        <Text className="text-xl mb-4">
                          {item.title.charAt(0).toUpperCase() +
                            item.title.slice(1)}
                        </Text>
                      </View>
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={item.scheduleItems}
                        renderItem={({ item }) => (
                          <PictoInSchedule
                            url={item.visualItem.url}
                            dimention="w-8 h-8"
                          />
                        )}
                        ItemSeparatorComponent={() => (
                          <View style={{ width: 15 }} />
                        )}
                      />
                    </View>
                    <View
                      style={{
                        width: width * 0.2,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <SwitchButton />
                    </View>
                  </Animated.View>
                )}
                keyExtractor={(item) => item.id.toString()}
                style={{ marginVertical: 10 }}
                contentContainerStyle={{
                  marginVertical: 10,
                }}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View className="flex-1 items-center mb-30">
                <Backbutton
                  onPress={() => router.back()}
                  position="top-2 left-5"
                />
                <Text className="text-3xl w-full text-start p-6 mt-20">
                  Mis horarios
                </Text>
                <Text className="mt-10 text-xl">
                  No tienes horarios para mostrar
                </Text>
              </View>
            )}
            <PrimaryButton
              onPress={handleOKPress}
              text="OK"
              textColor="white"
              backGroundColor={globalStyles.colors.primary[500]}
            />
            <PrimaryButton
              onPress={() => setIsVisibleSchedules(false)}
              text="Cancelar"
              textColor="black"
              backGroundColor={globalStyles.colors.gray16}
            />
          </Animated.View>
        </>
      )}
    </>
  );
};

export default CalendarScreen;
