import { SESSION_DURATION } from "@/constants/global-constatnt";
import { useEffect, useState } from "react";
import { useAuthState } from "../../store/authState";
import { SessioExpiredContext } from "./session-expired.context";

export const SessinExipiredProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { logOut } = useAuthState();
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSessionExpired(true);
    }, SESSION_DURATION);

    return () => clearTimeout(timer);
  }, [logOut, sessionExpired]);

  return (
    <SessioExpiredContext value={{ logOut, sessionExpired, setSessionExpired }}>
      {children}
    </SessioExpiredContext>
  );
};
