import { useAuthState } from "@/modules/auth/store/authState";
import { useState } from "react";
import { saveScheduleClendar } from "../services/calendar.service";
import { useCalendarQuery } from "./useCalendarQuery";

interface Props {
  schedulesIds: string[];
  setSchedulesIds: React.Dispatch<React.SetStateAction<string[]>>;

  setIsVisibleSchedules: (isVisible: boolean) => void;
}

export const useSaveEvents = ({
  setIsVisibleSchedules,
  schedulesIds,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useAuthState();

  const { getAllCalendarEventsQuery } = useCalendarQuery(token);

  const handleOKPress = async (selected: string) => {
    const data = { date: selected, shceduleIds: schedulesIds };
    try {
      setIsLoading(true);
      await saveScheduleClendar(data, token);
      setIsVisibleSchedules(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
      //setSchedulesIds([]);
      getAllCalendarEventsQuery.refetch();
    }
  };
  return {
    isLoading,
    setIsLoading,
    handleOKPress,
  };
};
