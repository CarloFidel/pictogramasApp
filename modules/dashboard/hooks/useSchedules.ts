import { useQuery } from "@tanstack/react-query";
import { getSchedulesFromUser } from "../../shedules/services/userSchedules.service";
import { LoadSchedule } from "../interfaces/LoadSchedule.interface";

export const useSchedules = (token: string) => {
  const getAllSchedulesQuery = useQuery<LoadSchedule>({
    queryKey: ["schedulesAll", "getSchedulesFromUser"],
    queryFn: () => getSchedulesFromUser(token),
    staleTime: 1000 * 60 * 60 * 24, //la data estará activa durante 24 horas
  });

  return {
    getAllSchedulesQuery,
  };
};
