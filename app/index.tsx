import { useAuthState } from "@/modules/auth/store/authState";
import { Redirect } from "expo-router";

const AppPicto = () => {
  const { isLoggedIn } = useAuthState();
  return <Redirect href={isLoggedIn ? "/profile" : "/onboarding"} />;
};

export default AppPicto;
