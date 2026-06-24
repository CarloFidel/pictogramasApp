import { useQuery } from "@tanstack/react-query";
import { getSchedulesFromUser } from "../services/axios-UserSchedules";

export const useSchedules = (token: string) => {
  const getAllSchedulesQuery = useQuery({
    queryKey: ["schedulesAll", "getSchedulesFromUser"],
    queryFn: () => getSchedulesFromUser(token),
    staleTime: 1000 * 60 * 60 * 24, //la data estará activa durante 24 horas
  });

  return {
    getAllSchedulesQuery,
  };
};
