import { useTabBarAnimation } from "@/common/animations/useTabBar";
import SessionExpired from "@/common/components/SessionExpired";
import { globalStyles } from "@/global-style";
import { SessioExpiredContext } from "@/modules/auth/context/session-expired-provider/session-expired.context";
import { useAuthState } from "@/modules/auth/store/authState";
import { EditModeContext } from "@/modules/shedules/context/edit-mode-context/EditModeContext";
import { PlayModeContext } from "@/modules/shedules/context/play-mode-context/PlayModeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, usePathname } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import React, { use, useEffect, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";

const Layout = () => {
  const [, setIsProffile] = useState<boolean>(true);
  const [isHorario, setIsHorario] = useState<boolean>(false);
  const [isArticle, setIsArticle] = useState<boolean>(false);

  const { width, height } = useWindowDimensions();

  const playContext = use(PlayModeContext);
  const { isPlayMode } = playContext!;

  const editContext = use(EditModeContext);
  const { isEditMode } = editContext!;

  const sessionContext = use(SessioExpiredContext);
  const { sessionExpired } = sessionContext!;

  const { isLoggedIn } = useAuthState();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/profile");
    } else {
      router.replace("/login");
    }
  }, [isLoggedIn]);

  const path = usePathname();
  console.log(path);

  const handleItemSelected = (item: number) => {
    if (item === 3) {
      setIsProffile(false);
      setIsHorario(false);
      setIsArticle(true);
      return;
    }
    if (item === 2) {
      setIsProffile(false);
      setIsHorario(true);
      setIsArticle(false);
      return;
    }

    setIsProffile(true);
    setIsHorario(false);
    setIsArticle(false);
  };

  const { movementStyle } = useTabBarAnimation({ isArticle, isHorario });

  useEffect(() => {
    if (path === "/horario") {
      setIsProffile(false);
      setIsHorario(true);
      setIsArticle(false);
    }
    if (path === "/article") {
      setIsProffile(false);
      setIsHorario(false);
      setIsArticle(true);
    }
  }, [path]);

  return (
    <>
      <Tabs>
        <TabSlot />
        <TabList
          style={[
            {
              opacity: isPlayMode || isEditMode || sessionExpired ? 0 : 1,
              width: width * 0.8,
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: width * 0.04,
              height: height * 0.09,
              position: "absolute",
              bottom: height * 0.076,
              left: width * 0.105,
              borderRadius: 20,
              zIndex: 10,
              backgroundColor: "white",
            },
          ]}
        >
          <TabTrigger
            name="profile"
            href="/profile"
            style={globalStyles.shadow_sm_ultra}
            onPress={() => handleItemSelected(1)}
          >
            <View className="gap-2 p-2 px-4 items-center ">
              <Ionicons name="person-outline" size={20} color="black" />
              <Text className="text-sm">Profile</Text>
            </View>
          </TabTrigger>
          <TabTrigger
            name="horario"
            href="/horario"
            style={globalStyles.shadow_sm_ultra}
            onPress={() => handleItemSelected(2)}
          >
            <View className="gap-2 p-2 px-4 items-center ">
              <Ionicons name="home-outline" size={20} color="black" />
              <Text className="text-sm">Horario</Text>
            </View>
          </TabTrigger>
          <TabTrigger
            name="articles"
            href="/articles"
            style={globalStyles.shadow_sm_ultra}
            onPress={() => handleItemSelected(3)}
          >
            <View className="gap-2 p-2 px-4 items-center ">
              <Ionicons name="book-outline" size={20} color="black" />
              <Text className="text-sm">Artículos</Text>
            </View>
          </TabTrigger>
        </TabList>
      </Tabs>
      <View
        style={[
          {
            position: "absolute",
            bottom: height * 0.07,
            left: width * 0.092,
            width: width * 0.825,
            height: height * 0.101,
            borderWidth: 1,
            borderColor: "#CECECE",
            borderRadius: 25,
            backgroundColor: "#E6F2FF",
            opacity: 0.4,
          },
          globalStyles.shadow_lg,
        ]}
      ></View>
      <Animated.View
        style={[
          {
            position: "absolute",
            bottom: height * 0.083,
            width: width * 0.18,
            height: height * 0.075,
          },
          globalStyles.shadow_md_up,
          movementStyle,
        ]}
        className="bg-primary-500 z-20 opacity-10 rounded-3xl"
      />
      {sessionExpired && <SessionExpired />}
    </>
  );
};

export default Layout;
