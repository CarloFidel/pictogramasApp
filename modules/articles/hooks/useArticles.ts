import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../services/axios-articles";

export const useArticles = (token: string) => {
  const getAllArticlesQuery = useQuery({
    queryKey: ["articlesAll", "getAllArticles"],
    queryFn: () => getArticles(token),
    staleTime: 1000 * 60 * 60 * 24, //la data estará activa durante 24 horas
  });

  return {
    getAllArticlesQuery,
  };
};
