import { useQuery } from "@tanstack/react-query";
import { SheduleEventesResponse } from "../interface/schedulesEventesResponse.interface";
import { getAllEventsfromUser } from "../services/calendar.service";

export const useCalendarQuery = (token: string) => {
  const getAllCalendarEventsQuery = useQuery<SheduleEventesResponse>({
    queryKey: ["calendarEventsAll", "getAllEventsfromUser"],
    queryFn: () => getAllEventsfromUser(token),
    staleTime: 1000 * 60 * 60 * 24, //la data estará activa durante 24 horas
  });

  return {
    getAllCalendarEventsQuery,
  };
};
