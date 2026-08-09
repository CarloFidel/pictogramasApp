import CalendarScreen from "@/modules/calendar/screen/CalendarScreen";
import { StatusBar } from "expo-status-bar";
import React from "react";

const index = () => {
  return (
    <>
      <StatusBar style="dark" backgroundColor="white" />
      <CalendarScreen />
    </>
  );
};

export default index;
