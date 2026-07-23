import Loading from "@/common/components/loading";
import { globalStyles } from "@/global-style";
import { useAuthState } from "@/modules/auth/store/authState";
import useLoadSchedule from "@/modules/dashboard/hooks/useLoadSchedule";
import { useSchedules } from "@/modules/dashboard/hooks/useSchedules";
import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { Modal, Pressable, Text, useWindowDimensions } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useLoadScheduleAnimation } from "../../animations/loadScheduleShort/useLoadScheduleAnimation";
import FlatListInSaveModal from "./FlatListInSaveModal";

interface Props {
  handleSaveMenuVisibility: (term: boolean) => void;
  handleSavePress: () => void;
  setSaveModallVisible: (term: boolean) => void;
}

const SaveMenuModal = ({
  handleSaveMenuVisibility,
  handleSavePress,
  setSaveModallVisible,
}: Props) => {
  const { width } = useWindowDimensions();

  const { token } = useAuthState();

  const [savedVissible, setSavedVissible] = useState<boolean>(false);

  const { getAllSchedulesQuery } = useSchedules(token);
  const schedulesResponse = getAllSchedulesQuery.data;

  const { savedShcedulesBehaviour } = useLoadScheduleAnimation({
    savedVissible,
  });

  const { handleSetPictosOn } = useLoadSchedule();

  const handleOpenSavedSchedules = () => {
    setSavedVissible(true);
  };

  const handlePlay = (id: string) => {
    setSavedVissible(false);
    handleSetPictosOn(id);
    setSaveModallVisible(false);
  };

  return (
    <Modal animationType="slide" transparent>
      <Animated.View
        className="bg-white items-center px-4 relative gap-8 py-10"
        style={[
          {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            width: width,
          },
          globalStyles.shadow_md,
          savedShcedulesBehaviour,
        ]}
      >
        <Pressable
          className="z-10 absolute top-6 right-6"
          onPress={() => handleSaveMenuVisibility(false)}
        >
          <Feather name="x" size={24} color="black" />
        </Pressable>
        <Pressable
          className="flex flex-row items-center gap-4 w-full"
          onPress={handleSavePress}
        >
          <Feather name="save" size={24} color="grey" />
          <Text>Guardar horario</Text>
        </Pressable>
        {!savedVissible && (
          <Pressable
            className="flex flex-row items-center gap-4 w-full"
            onPress={handleOpenSavedSchedules}
          >
            <Feather name="folder" size={24} color="grey" />
            <Text>Abrir horario</Text>
          </Pressable>
        )}
        {savedVissible && getAllSchedulesQuery.isLoading && <Loading />}

        {savedVissible &&
          ((!getAllSchedulesQuery.isLoading &&
            schedulesResponse?.schedule.length === 0) ||
            !schedulesResponse) && (
            <Animated.View entering={FadeIn.delay(300)}>
              <Text className="text-xl mt-20">
                No hay horarios para mostrar
              </Text>
            </Animated.View>
          )}
        {savedVissible &&
          !getAllSchedulesQuery.isLoading &&
          schedulesResponse?.schedule.length !== 0 && (
            <FlatListInSaveModal
              data={schedulesResponse!.schedule}
              handlePlay={handlePlay}
              refreching={getAllSchedulesQuery}
            />
          )}
      </Animated.View>
    </Modal>
  );
};

export default SaveMenuModal;
