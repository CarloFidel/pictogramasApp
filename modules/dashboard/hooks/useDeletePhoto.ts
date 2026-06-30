import { useAuthState } from "@/modules/auth/store/authState";
import { useState } from "react";
import { deletePhoto } from "../services/axios-DeletePhoto";

export const useDeletePhoto = () => {
  const [openDeletePhotoPopUp, setOpenDeletePhotoPopUp] =
    useState<boolean>(false);

  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number>(0);
  const [photoId, setPhotoId] = useState<string | null>(null);

  const { token } = useAuthState();

  const handleDeleteOpenPopUp = (id: string) => {
    setPhotoId(id);
    setStatusCode(0);
    setOpenDeletePhotoPopUp(true);
  };

  const handleDeletePhoto = async () => {
    if (!photoId) return;

    try {
      setIsLoadingDelete(true);
      const res = await deletePhoto(token, photoId);
      setStatusCode(res?.status ?? 200);
    } catch (error) {
      console.error(error);
      setStatusCode(500);
    } finally {
      setIsLoadingDelete(false);
    }
  };
  return {
    isLoadingDelete,
    statusCode,
    photoId,
    openDeletePhotoPopUp,

    handleDeleteOpenPopUp,
    handleDeletePhoto,
    setOpenDeletePhotoPopUp,
  };
};
