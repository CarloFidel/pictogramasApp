import { useAuthState } from "@/modules/auth/store/authState";
import { router } from "expo-router";
import { useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { Article } from "../interfaces/article.interface";
import { createArticle } from "../services/articles.service";
import { useArticles } from "./useArticles";

interface Props {
  handleSubmit: UseFormHandleSubmit<Article>;
}

const useCreateArticle = ({ handleSubmit }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [succes, setSucces] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const { token } = useAuthState();

  const { getAllArticlesQuery } = useArticles(token);

  const handleCreateArticle = async (data: Article) => {
    const createDate = {
      ...data,
      token,
    };

    setError(null);
    setSucces(false);
    setIsLoading(true);

    try {
      await createArticle(createDate);
      getAllArticlesQuery.refetch();
      setSucces(true);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async () => {
    const submitFunction = handleSubmit(handleCreateArticle);
    await submitFunction();
  };

  const handleSuccesPress = () => {
    setSucces(false);
    router.navigate("/articles");
  };

  return {
    isLoading,
    succes,
    error,

    onSubmit,
    handleCreateArticle,
    setError,
    handleSuccesPress,
  };
};

export default useCreateArticle;
