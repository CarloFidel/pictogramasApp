import ProfileScreen from "@/modules/dashboard/screens/ProfileScreen";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
  return (
    <>
      <StatusBar style="light" backgroundColor="white" />
      <ProfileScreen />
    </>
  );
};

export default Profile;
