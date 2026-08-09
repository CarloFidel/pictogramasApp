import { createContext } from "react";

interface Props {
  sessionExpired: boolean | null;
  logOut: () => void;
  setSessionExpired: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const SessioExpiredContext = createContext<Props | undefined>(undefined);
