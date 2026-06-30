import PersonalScreen from "@/modules/dashboard/screens/PersonalScreen";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

const Personal = () => {
  return (
    <>
      {Platform.OS === "android" ? (
        <StatusBar style="dark" backgroundColor="white" />
      ) : null}
      <PersonalScreen />
    </>
  );
};

export default Personal;
