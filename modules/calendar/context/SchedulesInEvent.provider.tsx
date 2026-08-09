import { ReactNode, useState } from "react";
import { SchedulesInEventContext } from "./SchedulesInEvent.context";

export const SchedulesInEvenProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [schedulesIds, setSchedulesIds] = useState<string[]>([]);

  return (
    <SchedulesInEventContext value={{ schedulesIds, setSchedulesIds }}>
      {children}
    </SchedulesInEventContext>
  );
};
