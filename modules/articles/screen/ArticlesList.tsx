import BlurComponent from "@/common/components/BlurComponent";
import Loading from "@/common/components/loading";
import { globalStyles } from "@/global-style";
import { useAuthState } from "@/modules/auth/store/authState";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useArticles } from "../hooks/useArticles";

const ArticlesList = () => {
  const { height } = useWindowDimensions();
  const { token } = useAuthState();

  const { getAllArticlesQuery } = useArticles(token);
  const articlesQueryResponse = getAllArticlesQuery.data;

  return (
    <>
      <SafeAreaView
        className="flex-1 w-full px-5 justify-start "
        accessibilityIgnoresInvertColors
      >
        <View className="items-center" style={{ marginTop: height * 0.045 }}>
          <Text className="text-3xl w-full text-start">Artículos</Text>
        </View>
        {getAllArticlesQuery.isFetching && (
          <>
            <BlurComponent />
            <Loading />
          </>
        )}
        <View style={{ height: height * 0.65 }}>
          <FlatList
            data={articlesQueryResponse}
            style={{ marginTop: 40 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: globalStyles.colors.gray16,
                  borderRadius: 10,
                  gap: 10,
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                }}
              >
                <Text className="text-2xl">{item.title}</Text>
                <Text>{item.resume}</Text>

                <View
                  style={{
                    position: "absolute",
                    right: 18,
                    top: 0,
                    bottom: 0,
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <Pressable>
                    <Ionicons
                      name="heart-outline"
                      size={20}
                      color={globalStyles.colors.gray55}
                    />
                  </Pressable>

                  <Pressable>
                    <Ionicons
                      name="thumbs-up-outline"
                      size={20}
                      color={globalStyles.colors.gray55}
                    />
                  </Pressable>
                </View>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default ArticlesList;
