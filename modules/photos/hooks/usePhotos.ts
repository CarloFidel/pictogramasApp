import { useQuery } from "@tanstack/react-query";
import { getAllPhotosFromUser } from "../services/axios-UserPhotos";

export const usePhotos = (token: string) => {
  const getAllPhotosQuery = useQuery({
    queryKey: ["photosAll", "getAllPhotosFromUser"],
    queryFn: () => getAllPhotosFromUser(token),
    staleTime: 1000 * 60 * 60 * 24, //la data estará activa durante 24 horas
  });

  return {
    getAllPhotosQuery,
  };
};
