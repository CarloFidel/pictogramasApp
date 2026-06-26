export interface LoadSchedule {
  schedule: Schedule[];
  userData: UserData;
}

export interface Schedule {
  id: string;
  title: string;
  scheduleItems: ScheduleItem[];
}

export interface ScheduleItem {
  id: string;
  position: number;
  schedule: Hedule;
  visualItem: VisualItem;
}

export interface Hedule {
  id: string;
  title: string;
}

export interface VisualItem {
  id: string;
  url: string;
  type: string;
  word: string;
  shedule: Hedule;
}

export interface UserData {
  id: string;
  name: string;
  lastName: string;
  email: string;
  isActive: boolean;
  roles: string;
}
