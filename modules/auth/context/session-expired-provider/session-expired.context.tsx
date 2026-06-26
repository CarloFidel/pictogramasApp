import { createContext } from "react";

interface Props {
  sessionExpired: boolean;
  logOut: () => void;
  setSessionExpired: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SessioExpiredContext = createContext<Props | undefined>(undefined);
