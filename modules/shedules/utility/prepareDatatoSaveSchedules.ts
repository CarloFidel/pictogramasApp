import { Pictograma } from "@/infrastructure/picto/interfaces/picto.interface";

export const prepareDataSaveSchedules = (pictosOn: Pictograma[]) => {
  const scheduleItems = pictosOn.map((scheduleItem) => {
    return {
      position: pictosOn.indexOf(scheduleItem),
      visualitem: {
        url: scheduleItem.imageUrl,
        type: scheduleItem.isPhoto ? "photo" : "picto",
        word: scheduleItem.keyword,
      },
    };
  });
  return scheduleItems;
};
