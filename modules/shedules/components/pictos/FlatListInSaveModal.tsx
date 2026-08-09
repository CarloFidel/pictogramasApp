import { globalStyles } from "@/global-style";
import PictoInSchedule from "@/modules/dashboard/components/PictoInSchedule";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import Animated, { FadeIn } from "react-native-reanimated";
import { transformCapitalize } from "../../utility/transformCapitalize";

interface Props {
  data: any[];

  refreching?: any;

  handlePlay: (item: string) => void;
}
const FlatListInSaveModal = ({ handlePlay, data, refreching }: Props) => {
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        width: width,
        height: height * 0.5,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
              backgroundColor: globalStyles.colors.primary[50],
            }}
          >
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xl text-gray-600">
                {transformCapitalize(item.title)}
              </Text>
              <Pressable
                onPress={() => handlePlay(item.id)}
                style={{
                  borderWidth: 1,
                  borderColor: globalStyles.colors.gray55,

                  //backgroundColor: globalStyles.colors.primary[600],
                  padding: 7,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                  marginVertical: 5,
                }}
              >
                <Ionicons
                  name="play"
                  size={18}
                  color={globalStyles.colors.gray55}
                  style={{ marginLeft: 2 }}
                />
              </Pressable>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={item.scheduleItems}
              renderItem={({ item }) => (
                <PictoInSchedule
                  url={item.visualItem.url}
                  dimention="w-12 h-12"
                />
              )}
              ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            />
          </Animated.View>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={{
          marginBottom: 25,
          width: width * 0.93,
          borderRadius: 10,
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
