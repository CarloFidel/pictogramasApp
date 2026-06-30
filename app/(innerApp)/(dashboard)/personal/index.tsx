import PersonalScreen from "@/modules/dashboard/screens/PersonalScreen";
import { StatusBar } from "expo-status-bar";

const Personal = () => {
  return (
    <>
      <StatusBar style="dark" backgroundColor="white" />
      <PersonalScreen />
    </>
  );
};

export default Personal;
