import { pictoApi } from "@/config/api-picto/api-picto.config";
import { CalendarMapper } from "@/infrastructure/calendar/mapper/calendar.mapper";
import { SheduleEventes } from "../interface/scheduleEventData.interface";

export const saveScheduleClendar = async (
  { date, shceduleId }: SheduleEventes,
  token: string,
) => {
  console.log(
    "saveScheduleClendar",
    JSON.stringify({ date, shceduleId }, null, 2),
  );
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

export const getAllEventsfromUser = async (token: string) => {
  try {
    const res = await pictoApi.get("/calendar/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const events = res.data.map(CalendarMapper.fromAraasacApi);

    return {
      response: res.data,
      events,
    };
  } catch (error) {
    throw error;
  }
};
