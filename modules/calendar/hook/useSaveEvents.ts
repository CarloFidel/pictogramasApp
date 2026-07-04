import { useAuthState } from "@/modules/auth/store/authState";
import { useState } from "react";
import { saveScheduleClendar } from "../services/axios-pictograms";
import { useCalendarQuery } from "./useCalendarQuery";

interface Props {
  setIsVisibleSchedules: (isVisible: boolean) => void;
}

export const useSaveEvents = ({ setIsVisibleSchedules }: Props) => {
  const [schedulesEvents, setSchedulesEvents] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useAuthState();

  const { getAllCalendarEventsQuery } = useCalendarQuery(token);

  const handleOKPress = async (selected: string) => {
    const data = { date: selected, shcedulesIds: schedulesEvents };
    try {
      setIsLoading(true);
      await saveScheduleClendar(data, token);
      setIsVisibleSchedules(false);
      getAllCalendarEventsQuery.refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchChange = (isSwitchOn: boolean, scheduleId: string) => {
    if (isSwitchOn) {
      setSchedulesEvents((prev) => [...prev, scheduleId]);
    } else {
      setSchedulesEvents((prev) =>
        prev.filter((event) => event !== scheduleId),
      );
    }
  };

  return { isLoading, setIsLoading, handleOKPress, handleSwitchChange };
};
