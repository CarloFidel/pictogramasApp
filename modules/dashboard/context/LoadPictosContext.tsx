import { Pictograma } from "@/infrastructure/picto/interfaces/picto.interface";
import { createContext } from "react";

export interface LoadPictos {
  pictosLoaded: Pictograma[];
  setPictosLoaded: React.Dispatch<React.SetStateAction<Pictograma[]>>;
}

export const LoadPictosContext = createContext<LoadPictos | undefined>(
  undefined,
);
