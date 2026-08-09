import Loading from "@/common/components/loading";
import PrimaryButton from "@/common/components/PrimaryButton";
import { globalStyles } from "@/global-style";
import { LoadSchedule } from "@/modules/dashboard/interfaces/LoadSchedule.interface";
import React from "react";
import { Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import FleatListUserShedules from "./FleatListUserShedules";

interface Props {
  width: number;
  height: number;
  selected: string;
  isLoading: boolean;
  schedulesResponse: LoadSchedule | undefined;

  handleSaveandRefetch: (selected: string) => void;
  setIsVisibleSchedules: (value: boolean) => void;
}

const SetSchedulesToCalendar = ({
  height,
  width,
  isLoading,
  selected,
  schedulesResponse,
  setIsVisibleSchedules,

  handleSaveandRefetch,
}: Props) => {
  return (
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
      <Text className="text-3xl text-center mt-10 w-full">Mis horarios</Text>
      {isLoading && <Loading />}
      {schedulesResponse?.schedule.length! > 0 ? (
        <FleatListUserShedules selected={selected} />
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
          onPress={() => handleSaveandRefetch(selected)}
          text="Ok"
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
  );
};

export default SetSchedulesToCalendar;
