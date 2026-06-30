import MySchedulesScreen from "@/modules/dashboard/screens/MySchedulesScreen";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
  return (
    <>
      <StatusBar style="dark" backgroundColor="white" />
      <MySchedulesScreen />
    </>
  );
};

export default Profile;
