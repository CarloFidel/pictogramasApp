import { globalStyles } from "@/global-style";
import { CalendarResponse } from "../interfaces/calendar-response";

export class CalendarMapper {
  static fromAraasacApi = (calendar: CalendarResponse) => {
    if (!calendar.sheduleId.length) return {};

    const date: string = calendar.date;

    return {
      [date]: {
        marked: true,
        dotColor: globalStyles.colors.primary[500],
      },
    };
  };
}
