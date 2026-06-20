import { createContext } from "react";

interface EditContext {
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditModeContext = createContext<EditContext | undefined>(
  undefined,
);
