import { createContext } from "react";

interface PlayContext {
  isPlayMode: boolean;
  setIsPlayMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PlayModeContext = createContext<PlayContext | undefined>(
  undefined,
);
