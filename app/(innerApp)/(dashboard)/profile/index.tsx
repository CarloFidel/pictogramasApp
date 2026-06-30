import ProfileScreen from "@/modules/dashboard/screens/ProfileScreen";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

const Profile = () => {
  return (
    <>
      {Platform.OS === "android" ? (
        <StatusBar style="light" backgroundColor="white" />
      ) : null}

      <ProfileScreen />
    </>
  );
};

export default Profile;
