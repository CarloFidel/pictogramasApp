import { create } from "zustand";
import { TemporalCamaraState } from "../interfaces/TemporalCamaraState";

export const useCamaraStore = create<TemporalCamaraState>((set) => ({
  picture: "",
  addPicture(image) {
    set((state) => {
      return {
        picture: image,
      };
    });
  },
  clearPicture() {
    set((state) => ({
      picture: "",
    }));
  },
}));
