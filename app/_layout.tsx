import { EditModeProvider } from "@/modules/shedules/context/edit-mode-context/EditModeProvider";
import { PlayModeProvider } from "@/modules/shedules/context/play-mode-context/PlayModeProvider";
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

  return (
    <PlayModeProvider>
      <EditModeProvider>
        <Slot />
      </EditModeProvider>
    </PlayModeProvider>
  );
};

export default RootLayout;
