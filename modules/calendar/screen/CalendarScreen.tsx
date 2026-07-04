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
import Loading from "@/common/components/loading";
import PrimaryButton from "@/common/components/PrimaryButton";
import { globalStyles } from "@/global-style";
import { useAuthState } from "@/modules/auth/store/authState";
import { useSchedules } from "@/modules/dashboard/hooks/useSchedules";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import FleatListUserShedules from "../components/FleatListUserShedules";
import { agendaEventsMock } from "../data/agendaEvents.mock";
import { useCalendarQuery } from "../hook/useCalendarQuery";
import { useSaveEvents } from "../hook/useSaveEvents";
import { todayDate } from "../utility/todayDate";

const CalendarScreen = () => {
  const [isVisibleSchedules, setIsVisibleSchedules] = useState<boolean>(false);
  const [selected, setSelected] = useState(todayDate());

  const { width, height } = useWindowDimensions();

  const { token } = useAuthState();

  const { getAllSchedulesQuery } = useSchedules(token);
  const schedulesResponse = getAllSchedulesQuery.data;

  const { getAllCalendarEventsQuery } = useCalendarQuery(token);
  const calendarEventsResponse = getAllCalendarEventsQuery.data;

  const { isLoading, handleOKPress, handleSwitchChange } = useSaveEvents({
    setIsVisibleSchedules,
  });

  if (getAllCalendarEventsQuery.isLoading) {
    return <Loading />;
  }

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
            markedDates={Object.assign({}, ...calendarEventsResponse!)}
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
            sections={agendaEventsMock}
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
              height: height * 0.7,
              borderRadius: 20,
              position: "absolute",
              top: height * 0.12,
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
            {isLoading && <Loading />}
            {schedulesResponse?.schedule.length! > 0 ? (
              <FleatListUserShedules handleSwitchChange={handleSwitchChange} />
            ) : (
              !isLoading && (
                <View className="flex-1 items-center mb-30">
                  <Text className="mt-10 text-xl">
                    No tienes horarios para mostrar
                  </Text>
                </View>
              )
            )}
            {schedulesResponse?.schedule.length! > 0 && (
              <PrimaryButton
                onPress={() => handleOKPress(selected)}
                text="Agregar"
                textColor="white"
                backGroundColor={globalStyles.colors.primary[500]}
              />
            )}
            <PrimaryButton
              onPress={() => setIsVisibleSchedules(false)}
              text="Cancelar"
              textColor="black"
              backGroundColor={globalStyles.colors.gray16}
            />
          </Animated.View>
        </>
      )}
      {isLoading && (
        <>
          <BlurComponent />
          <Loading />
        </>
      )}
    </>
  );
};

export default CalendarScreen;
