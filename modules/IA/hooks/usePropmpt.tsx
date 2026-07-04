import { getPicoByWord } from "@/common/services/axios-getPictoByWord";
import { Pictograma } from "@/infrastructure/picto/interfaces/picto.interface";
import { useAuthState } from "@/modules/auth/store/authState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PromptSchema } from "../schema/PromptSchema";
import { generatePrompt } from "../services/axios-IA";

export const usePropmt = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resError, setResError] = useState<string | undefined>();
  const [response, setResponse] = useState<Pictograma[]>([]);

  const [title, setTitle] = useState<string>("");

  const { token } = useAuthState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ action: string }>({ resolver: zodResolver(PromptSchema) });

  const onSubmit = handleSubmit(async ({ action }) => {
    setTitle(action);

    try {
      setIsLoading(true);
      const res = await generatePrompt(action, token);
      const pictos = await Promise.all(
        res.words.map((word: string) => getPicoByWord(word)),
      );
      setResponse((prev) => [...prev, ...pictos]);
    } catch (error: any) {
      console.log(error);
      setResError(error);
    } finally {
      setIsLoading(false);
    }
  });
  return {
    isLoading,
    resError,
    control,
    errors,
    response,
    title,

    setResponse,
    setResError,
    handleSubmit,
    onSubmit,
    setIsLoading,
  };
};
