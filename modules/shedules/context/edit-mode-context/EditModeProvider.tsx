import { useState } from "react";
import { EditModeContext } from "./EditModeContext";

export const EditModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <EditModeContext value={{ isEditMode, setIsEditMode }}>
      {children}
    </EditModeContext>
  );
};
