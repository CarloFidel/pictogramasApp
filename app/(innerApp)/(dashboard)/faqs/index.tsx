import FrecuentAsk from "@/modules/dashboard/screens/FrecuentAsk";
import { StatusBar } from "expo-status-bar";

const FrecuentAskScreen = () => {
  return (
    <>
      <StatusBar style="dark" backgroundColor="white" />
      <FrecuentAsk />
    </>
  );
};

export default FrecuentAskScreen;
