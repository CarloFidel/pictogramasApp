import { User } from "@/modules/auth/interfaces/User.interface";

export interface SheduleInterface {
  id: string;
  title: string;
  user?: User;
}
