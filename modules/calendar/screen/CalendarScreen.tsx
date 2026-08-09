import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

import Backbutton from "@/common/components/Backbutton";
import BlurComponent from "@/common/components/BlurComponent";
import Loading from "@/common/components/loading";
import { globalStyles } from "@/global-style";
import { useAuthState } from "@/modules/auth/store/authState";
import { useSchedules } from "@/modules/dashboard/hooks/useSchedules";
import Ionicons from "@expo/vector-icons/Ionicons";
import { use, useEffect, useState } from "react";
import { Pressable, Text, useWindowDimensions } from "react-native";
import SchedulesOnDay from "../components/SchedulesOnDay";
import SetSchedulesToCalendar from "../components/SetSchedulesToCalendar";
import { SchedulesInEventContext } from "../context/SchedulesInEvent.context";
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

  const calendarResponse = getAllCalendarEventsQuery.data?.response;
  const calendarEventsResponse = getAllCalendarEventsQuery.data?.events;

  const schedulesInEvent = use(SchedulesInEventContext);
  const { schedulesIds, setSchedulesIds } = schedulesInEvent!;

  useEffect(() => {
    if (!calendarResponse) return;
    const event =
      calendarResponse?.filter((event) => event.date === selected) ?? [];
    setSchedulesIds(event.length > 0 ? event[0].sheduleId : []);
  }, [selected]);

  const { isLoading, handleOKPress } = useSaveEvents({
    setIsVisibleSchedules,
    schedulesIds,
    setSchedulesIds,
  });
  const handleSaveandRefetch = async (selected: string) => {
    await handleOKPress(selected);
    await getAllCalendarEventsQuery.refetch();
  };

  return (
    <>
      <StatusBar style="dark" backgroundColor="white" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <Backbutton
          position="left-5 top-16"
          onPress={() => {
            router.back();
          }}
        />
        <Text className="text-3xl justify-start mt-20 w-full px-5">
          Calendario
        </Text>
        {!getAllCalendarEventsQuery.isLoading && (
          <Pressable
            className="bg-primary-400 p-3 rounded-full"
            style={{
              position: "absolute",
              bottom: height * 0.16,
              right: width * 0.05,
              zIndex: 10,
            }}
            onPress={() => setIsVisibleSchedules(true)}
          >
            <Ionicons name="add" size={30} color="white" />
          </Pressable>
        )}
        <CalendarProvider
          date={new Date().toISOString().split("T")[0]}

          style={{
            flex: 1,
            marginTop: height * 0.01,
          }}
        >
          {!getAllCalendarEventsQuery.isLoading && (
            <ExpandableCalendar
              markedDates={
                calendarEventsResponse
                  ? Object.assign({}, ...calendarEventsResponse)
                  : null
              }
              monthFormat={"MMMM yyyy"}
              firstDay={1}
              allowShadow={true}
              theme={{
                todayBackgroundColor: globalStyles.colors.backGroundLight,
                todayTextColor: globalStyles.colors.textColor,
                textMonthFontSize: 20,
                arrowColor: globalStyles.colors.textColor,
                arrowHeight: 30,
                textDayFontSize: 16,
                textDayHeaderFontSize: 16,
                selectedDayBackgroundColor: globalStyles.colors.primary[400],
                selectedDayTextColor: "white",
                todayButtonTextColor: globalStyles.colors.primary[400],
              }}
              onDayPress={(day) => {
                setSelected(day.dateString);
              }}
            />
          )}
          <SchedulesOnDay
            date={selected}
            schedulesId={
              calendarResponse?.find((event) => event.date === selected)
                ?.sheduleId ?? []
            }
          />
        </CalendarProvider>

        {getAllCalendarEventsQuery.isLoading && (
          <>
            <BlurComponent />
            <Loading />
          </>
        )}
      </SafeAreaView>

      {isVisibleSchedules && (
        <>
          <BlurComponent />
          <SetSchedulesToCalendar
            height={height}
            width={width}
            isLoading={isLoading}
            schedulesResponse={schedulesResponse}
            selected={selected}
            setIsVisibleSchedules={setIsVisibleSchedules}
            handleSaveandRefetch={handleSaveandRefetch}
          />
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
