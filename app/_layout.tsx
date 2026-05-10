import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import "./global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "work-blackHankenGrotesk-Bold": require("../assets/fonts/hanken-grotesk/HankenGrotesk-Bold.ttf"),
    "work-lightHankenGrotesk": require("../assets/fonts/hanken-grotesk/HankenGrotesk-Light.ttf"),
    "work-mediumHankenGrotesk": require("../assets/fonts/hanken-grotesk/HankenGrotesk-Medium.ttf"),
    "work-regularHankenGrotesk": require("../assets/fonts/hanken-grotesk/HankenGrotesk-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return <Slot />;
};

export default RootLayout;
