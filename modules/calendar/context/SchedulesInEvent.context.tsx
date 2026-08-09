import { createContext } from "react";

interface Props {
  schedulesIds: string[];
  setSchedulesIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SchedulesInEventContext = createContext<Props | undefined>(
  undefined,
);
