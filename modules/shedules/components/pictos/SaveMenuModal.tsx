import Loading from "@/common/components/loading";
import { globalStyles } from "@/global-style";
import { useAuthState } from "@/modules/auth/store/authState";
import PictoInSchedule from "@/modules/dashboard/components/PictoInSchedule";
import useLoadSchedule from "@/modules/dashboard/hooks/useLoadSchedule";
import { useSchedules } from "@/modules/dashboard/hooks/useSchedules";
import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useLoadScheduleAnimation } from "../../animations/loadScheduleShort/useLoadScheduleAnimation";
import { transformCapitalize } from "../../utility/transformCapitalize";

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
        className="bg-white px-4 relative gap-8 py-10"
        style={[
          {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            width: width,

            /*             marginTop: height * h,
            height: height * (1 - h),
 */
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
          className="flex flex-row items-center gap-4"
          onPress={handleSavePress}
        >
          <Feather name="save" size={24} color="grey" />
          <Text>Guardar horario</Text>
        </Pressable>
        {!savedVissible && (
          <Pressable
            className="flex flex-row items-center gap-4"
            onPress={handleOpenSavedSchedules}
          >
            <Feather name="folder" size={24} color="grey" />
            <Text>Abrir horario</Text>
          </Pressable>
        )}
        {savedVissible &&
          (!schedulesResponse || schedulesResponse.schedule.length === 0 ? (
            <Loading />
          ) : (
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
                  className="w-full px-5 py-2 rounded-lg"
                  style={{
                    marginBottom: 20,
                    width: width * 0.93,
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: globalStyles.colors.gray16,
                  }}
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-2xl">
                      {transformCapitalize(item.title)}
                    </Text>
                    <Pressable onPress={() => handlePlay(item.id)}>
                      <Feather name="play" size={20} color="black" />
                    </Pressable>
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
                      <View style={{ width: 10 }} />
                    )}
                  />
                </Animated.View>
              )}
              keyExtractor={(item) => item.id.toString()}
              style={{ marginVertical: 5, width: width }}
              contentContainerStyle={{
                width: width,
                marginVertical: 10,
              }}
              showsVerticalScrollIndicator={false}
            />
          ))}
      </Animated.View>
    </Modal>
  );
};

export default SaveMenuModal;
