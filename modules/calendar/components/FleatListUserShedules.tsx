import { useAuthState } from "@/modules/auth/store/authState";
import PictoInSchedule from "@/modules/dashboard/components/PictoInSchedule";
import { useSchedules } from "@/modules/dashboard/hooks/useSchedules";
import React from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import SwitchButton from "./SwitchButton";

interface Props {
  handleSwitchChange: (isSwitchOn: boolean, scheduleId: string) => void;
}

const FleatListUserShedules = ({ handleSwitchChange }: Props) => {
  const { width } = useWindowDimensions();

  const { token } = useAuthState();

  const { getAllSchedulesQuery } = useSchedules(token);
  const schedulesResponse = getAllSchedulesQuery.data;

  return (
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
              width: width * 0.8,
              paddingVertical: 10,
            }}
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-xl mb-4">
                {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
              </Text>
              <SwitchButton
                onSwitchChange={(isSwitchOn) =>
                  handleSwitchChange(isSwitchOn, item.id)
                }
              />
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={item.scheduleItems}
              renderItem={({ item }) => (
                <PictoInSchedule
                  url={item.visualItem.url}
                  dimention="w-10 h-10"
                />
              )}
              ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
            />
          </View>
          <View
            style={{
              width: width * 0.2,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
        </Animated.View>
      )}
      keyExtractor={(item) => item.id.toString()}
      style={{ marginVertical: 5 }}
      contentContainerStyle={{
        marginVertical: 10,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default FleatListUserShedules;
