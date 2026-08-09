import { Pictograma } from "@/infrastructure/picto/interfaces/picto.interface";
import { ReactNode, useState } from "react";
import { LoadPictosContext } from "./LoadPictosContext";

export const LoadPictosProvider = ({ children }: { children: ReactNode }) => {
  const [pictosLoaded, setPictosLoaded] = useState<Pictograma[]>([]);

  return (
    <LoadPictosContext value={{ pictosLoaded, setPictosLoaded }}>
      {children}
    </LoadPictosContext>
  );
};
