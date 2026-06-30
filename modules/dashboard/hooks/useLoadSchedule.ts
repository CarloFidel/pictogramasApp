import { useAuthState } from "@/modules/auth/store/authState";
import { router } from "expo-router";
import { use } from "react";
import { LoadPictosContext } from "../context/LoadPictosContext";
import { useSchedules } from "./useSchedules";

const useLoadSchedule = () => {
  const { token } = useAuthState();

  const { getAllSchedulesQuery } = useSchedules(token);
  const schedulesResponse = getAllSchedulesQuery.data;

  const loadPictosContext = use(LoadPictosContext);
  const { setPictosLoaded } = loadPictosContext!;

  const handleSetPictosOn = (id: string) => {
    setPictosLoaded([]);
    const schedules = schedulesResponse?.schedule;
    const scheduleTarget = schedules?.find((sched) => sched.id === id);

    const pictos = scheduleTarget?.scheduleItems.map((item) => ({
      id: item.id,
      keyword: item.visualItem.word,
      isPhoto: item.visualItem.type === "photo",
      imageUrl: item.visualItem.url,
    }));

    pictos?.forEach((picto) => setPictosLoaded((prev) => [...prev, picto]));
    router.push("/(innerApp)/horario");
  };

  return { handleSetPictosOn };
};

export default useLoadSchedule;
