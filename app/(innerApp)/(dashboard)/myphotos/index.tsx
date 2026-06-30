import MyPhotosScreen from "@/modules/dashboard/screens/MyPhotosScreen";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

const Personal = () => {
  return (
    <>
      {Platform.OS === "android" ? (
        <StatusBar style="dark" backgroundColor="white" />
      ) : null}
      <MyPhotosScreen />
    </>
  );
};

export default Personal;
