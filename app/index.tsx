import { SessioExpiredContext } from "@/modules/auth/context/session-expired-provider/session-expired.context";
import { Redirect } from "expo-router";
import { use } from "react";

const AppPicto = () => {
  const session = use(SessioExpiredContext);

  console.log(session?.sessionExpired);

  return (
    <>
      <Redirect href="/profile" />
    </>
  );
};

export default AppPicto;
