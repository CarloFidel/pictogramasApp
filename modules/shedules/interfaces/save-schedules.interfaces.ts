export interface SaveSchedule {
  title: string;
  items: [
    {
      position: number;
      visualitems: {
        url: string;
        type: "photo" | "picto";
        word: string;
      };
    },
  ];
}
