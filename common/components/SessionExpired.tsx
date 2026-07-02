import { useAuthState } from "@/modules/auth/store/authState";
import React from "react";
import BlurComponent from "./BlurComponent";
import PopUp from "./PopUp";

const SessionExpired = () => {
  const { logOut } = useAuthState();

  const handldeOkPress = () => {
    logOut();
  };

  return (
    <>
      <BlurComponent />
      <PopUp
        onPress={handldeOkPress}
        text=" Su sesión ha expirado, por favor ingrese de nuevo"
        warning
      />
    </>
  );
};

export default SessionExpired;
