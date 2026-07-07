import MyPhotosScreen from "@/modules/photos/screens/MyPhotosScreen";
import { StatusBar } from "expo-status-bar";

const Personal = () => {
  return (
    <>
      <StatusBar style="dark" backgroundColor="white" />
      <MyPhotosScreen />
    </>
  );
};

export default Personal;
