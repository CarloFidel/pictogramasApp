import { useTabBarAnimation } from "@/common/animations/useTabBar";
import { usetabBarBehaviour } from "@/common/hooks/usetabBarBehaviour";
import { globalStyles } from "@/global-style";
import { TokenPayload } from "@/modules/auth/interfaces/token.interface";
import { useAuthState } from "@/modules/auth/store/authState";
import { EditModeContext } from "@/modules/shedules/context/edit-mode-context/EditModeContext";
import { PlayModeContext } from "@/modules/shedules/context/play-mode-context/PlayModeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { router, usePathname } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { jwtDecode } from "jwt-decode";
import React, { use, useEffect, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";

const Layout = () => {
  const [, setIsProffile] = useState<boolean>(true);
  const [isHorario, setIsHorario] = useState<boolean>(false);
  const [isArticle, setIsArticle] = useState<boolean>(false);

  const { width, height } = useWindowDimensions();
  const path = usePathname();

  const playContext = use(PlayModeContext);
  const { isPlayMode } = playContext!;

  const editContext = use(EditModeContext);
  const { isEditMode } = editContext!;

  const { isLoggedIn, token, logOut } = useAuthState();

  useEffect(() => {
    if (!isLoggedIn || !token) {
      router.replace("/login");
      return;
    }

    const exp = jwtDecode<TokenPayload>(token).exp;
    if (Date.now() >= exp * 1000) {
      logOut();
      router.replace("/login");
      return;
    }
  }, [isLoggedIn, token, logOut]);

  useEffect(() => {
    if (path === "/horario") {
      setIsProffile(false);
      setIsHorario(true);
      setIsArticle(false);
    }
    if (path === "/articles") {
      setIsProffile(false);
      setIsHorario(false);
      setIsArticle(true);
    }
  }, [path]);

  const { handleItemSelected } = usetabBarBehaviour({
    setIsArticle,
    setIsProffile,
    setIsHorario,
  });

  const { movementStyle } = useTabBarAnimation({ isArticle, isHorario });
  return (
    <>
      <Tabs>
        <TabSlot />
        <TabList
          style={[
            {
              opacity: isPlayMode || isEditMode ? 0 : 0.75,
              width: width * 0.8,
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: width * 0.04,
              height: height * 0.09,
              position: "absolute",
              bottom: height * 0.053,
              left: width * 0.105,
              borderRadius: 20,
              zIndex: 10,
              backgroundColor: "rgba(255,255,255,0.45)",
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
            bottom: height * 0.047,
            left: width * 0.092,
            width: width * 0.825,
            height: height * 0.101,
            borderWidth: 1,
            borderColor: globalStyles.colors.gray16,
            borderRadius: 25,
            backgroundColor: "rgba(255,255,255,0.6)",
            opacity: isPlayMode || isEditMode ? 0 : 1,
          },
          globalStyles.shadow_lg,
        ]}
      ></View>
      <Animated.View
        style={[
          {
            position: "absolute",
            bottom: height * 0.06,
            width: width * 0.18,
            height: height * 0.075,
            opacity: isPlayMode || isEditMode ? 0 : 0.2,
          },
          globalStyles.shadow_md_up,
          movementStyle,
        ]}
        className="bg-primary-500 z-20 rounded-3xl"
      />
      <View
        style={{
          position: "absolute",
          bottom: height * 0.053,
          left: width * 0.105,
          width: width * 0.8,
          height: height * 0.09,
          borderRadius: 20,
          overflow: "hidden",
          opacity: isPlayMode || isEditMode ? 0 : 1,
        }}
      >
        <BlurView
          intensity={20}
          tint="light"
          experimentalBlurMethod="dimezisBlurView"
          style={{
            flex: 1,
          }}
        />
      </View>
    </>
  );
};

export default Layout;
