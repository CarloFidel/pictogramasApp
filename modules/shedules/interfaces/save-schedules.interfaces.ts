export interface SaveSchedule {
  title: string;
  items: SheduleItems[];
}

export interface SheduleItems {
  position: number;
  visualitem: VisualItem;
}

export interface VisualItem {
  url: string;
  type: string;
  word: string;
}
