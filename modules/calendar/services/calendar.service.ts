import { pictoApi } from "@/config/api-picto/api-picto.config";
import { CalendarResponse } from "@/infrastructure/calendar/interfaces/calendar-response";
import { CalendarMapper } from "@/infrastructure/calendar/mapper/calendar.mapper";
import { SheduleEventes } from "../interface/scheduleEventData.interface";

export const saveScheduleClendar = async (
  { date, shceduleId }: SheduleEventes,
  token: string,
) => {
  try {
    const res = await pictoApi.post(
      "/calendar/create",
      {
        date: date,
        sheduleId: shceduleId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return {
      res: res.data,
      status: res.status,
    };
  } catch (error) {
    throw error;
  }
};

export const getAllEventsfromUser = async (
  token: string,
): Promise<{ response: CalendarResponse[]; events: any[] }> => {
  try {
    const res = await pictoApi.get("/calendar/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const events = res.data.map(CalendarMapper.fromPictoApi);

    return {
      response: res.data,
      events,
    };
  } catch (error) {
    throw error;
  }
};
