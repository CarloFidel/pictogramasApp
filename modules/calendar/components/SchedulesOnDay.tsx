import { useAuthState } from "@/modules/auth/store/authState";
import useLoadSchedule from "@/modules/dashboard/hooks/useLoadSchedule";
import { useSchedules } from "@/modules/dashboard/hooks/useSchedules";
import FlatListInSaveModal from "@/modules/shedules/components/pictos/FlatListInSaveModal";
import { transformCapitalize } from "@/modules/shedules/utility/transformCapitalize";
import React from "react";
import { Text, useWindowDimensions, View } from "react-native";

interface Props {
  date: string;
  schedulesId: string[];
}

const SchedulesOnDay = ({ date, schedulesId }: Props) => {
  const { token } = useAuthState();
  const { getAllSchedulesQuery } = useSchedules(token);
  const allSchedules = getAllSchedulesQuery.data?.schedule ?? [];

  const { height } = useWindowDimensions();

  const { handleSetPictosOn } = useLoadSchedule();

  const dayName = new Date(date).toLocaleDateString("es-ES", {
    weekday: "long",
  });

  const schedulesForDay = allSchedules.filter((schedule) =>
    schedulesId.includes(schedule.id),
  );
  return (
    <View
      className="items-center justify-start bg-white overflow-hidden"
      style={{
        marginTop: 10,
        height: height * 0.6,
        width: "100%",
      }}
    >
      <View className="px-16 flex flex-row justify-between items-center">
        <Text className="text-xl w-full text-start">
          {transformCapitalize(dayName)}
        </Text>
        <Text className="text-base text-gray-500">{date}</Text>
      </View>
      <FlatListInSaveModal
        data={schedulesForDay}
        handlePlay={handleSetPictosOn}
      />
    </View>
  );
};

export default SchedulesOnDay;
