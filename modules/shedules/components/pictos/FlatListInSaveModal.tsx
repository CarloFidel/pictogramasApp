import { globalStyles } from "@/global-style";
import PictoInSchedule from "@/modules/dashboard/components/PictoInSchedule";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import Animated, { FadeIn } from "react-native-reanimated";

interface Props {
  data: any[];

  refreching?: any;

  handlePlay: (item: string) => void;
}
const FlatListInSaveModal = ({ handlePlay, data, refreching }: Props) => {
  const { width, height } = useWindowDimensions();
  return (
    <View>
      <FlatList
        horizontal={false}
        refreshControl={
          refreching && (
            <RefreshControl
              refreshing={refreching.isFetching}
              onRefresh={async () => {
                await refreching.refetch();
              }}
            />
          )
        }
        data={data}
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
              <Text className="text-2xl">{item.title}</Text>
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
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />
          </Animated.View>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={{
          marginVertical: 5,
          width: width * 0.93,
          height: height * 0.4,
        }}
        contentContainerStyle={{
          width: width * 0.93,
          marginVertical: 10,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FlatListInSaveModal;
