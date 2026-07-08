import { deleteUser } from "@/modules/auth/services/auth.service";
import { useAuthState } from "@/modules/auth/store/authState";
import { router } from "expo-router";
import { useState } from "react";

export const useDeleteAccount = () => {
  const [openDeleteAccountPopUp, setOpenDeleteAccountPopUp] =
    useState<boolean>(false);

  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number>(0);
  const [error, setError] = useState<any>();

  const { token } = useAuthState();

  const handleDeleteOpenPopUp = () => {
    setStatusCode(0);
    setOpenDeleteAccountPopUp(true);
  };

  const handleDeleteAccount = async () => {
    if (!token) return;

    try {
      setIsLoadingDelete(true);
      const res = await deleteUser(token);
      setStatusCode(res?.status ?? 200);
      router.push("/login");
    } catch (error) {
      setError(error);
      setStatusCode(500);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return {
    isLoadingDelete,
    statusCode,
    openDeleteAccountPopUp,
    setOpenDeleteAccountPopUp,
    error,

    handleDeleteOpenPopUp,
    handleDeleteAccount,
  };
};
