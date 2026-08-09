import { EditModeProvider } from "@/modules/shedules/context/edit-mode-context/EditModeProvider";
import { PlayModeProvider } from "@/modules/shedules/context/play-mode-context/PlayModeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { SchedulesInEvenProvider } from "@/modules/calendar/context/SchedulesInEvent.provider";
import { LoadPictosProvider } from "@/modules/dashboard/context/LoadPictosProvider";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import "./global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "hank-bold": require("../assets/fonts/hanken-grotesk/HankenGrotesk-Bold.ttf"),
    "hank-light": require("../assets/fonts/hanken-grotesk/HankenGrotesk-Light.ttf"),
    "hank-medium": require("../assets/fonts/hanken-grotesk/HankenGrotesk-Medium.ttf"),
    "hank-regular": require("../assets/fonts/hanken-grotesk/HankenGrotesk-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  const queryClient = new QueryClient();

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <LoadPictosProvider>
            <PlayModeProvider>
              <EditModeProvider>
                <SchedulesInEvenProvider>
                  <Slot />
                </SchedulesInEvenProvider>
              </EditModeProvider>
            </PlayModeProvider>
          </LoadPictosProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default RootLayout;
