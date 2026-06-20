import { useQuery } from "@tanstack/react-query";
import { getAllPictosfromArasaac } from "../services/axios-pictograms";

export const usePictos = () => {
  const getAllPictosQuery = useQuery({
    queryKey: ["pictosAll", "pictosfromArasaac"],
    queryFn: getAllPictosfromArasaac,
    staleTime: 1000 * 60 * 60 * 24, //la data estará activa durante 24 horas
  });

  return {
    getAllPictosQuery,
  };
};
