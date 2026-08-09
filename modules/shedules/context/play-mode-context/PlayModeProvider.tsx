import { useState } from "react";
import { PlayModeContext } from "./PlayModeContext";

export const PlayModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isPlayMode, setIsPlayMode] = useState<boolean>(false);

  return (
    <PlayModeContext value={{ isPlayMode, setIsPlayMode }}>
      {children}
    </PlayModeContext>
  );
};
