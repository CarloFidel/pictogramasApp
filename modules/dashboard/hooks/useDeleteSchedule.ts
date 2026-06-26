import { useAuthState } from "@/modules/auth/store/authState";
import React, { useState } from "react";
import { deleteSchedule } from "../services/axios-UserSchedules";

export const useDeleteSchedule = () => {
  const [openDeleteSchedulePopUp, setOpenDeleteSchedulePopUp] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number>(0);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(
    null,
  );

  const { token } = useAuthState();

  const handleDeleteOpenPopUp = (id: string) => {
    setSelectedScheduleId(id);
    setStatusCode(0);
    setOpenDeleteSchedulePopUp(true);
  };

  const handleDeleteSchedule = async () => {
    if (!selectedScheduleId) return;

    try {
      setIsLoading(true);
      const res = await deleteSchedule(token, selectedScheduleId);
      setStatusCode(res?.status ?? 200);
    } catch (error) {
      console.error(error);
      setStatusCode(500);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    statusCode,
    selectedScheduleId,
    openDeleteSchedulePopUp,

    handleDeleteOpenPopUp,
    handleDeleteSchedule,
    setOpenDeleteSchedulePopUp,
  };
};
