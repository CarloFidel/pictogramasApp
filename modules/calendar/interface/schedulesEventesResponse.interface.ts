export interface SheduleEventesResponse {
  response: Response[];
  events: Record<string, { marked: boolean; dotColor: string }>[];
}
export interface Response {
  id: string;
  date: string;
  shcedulesIds: string[];
}
