import { getPicoByWord } from "@/common/services/axios-getPictoByWord";
import { useAuthState } from "@/modules/auth/store/authState";
import { LoadPictosContext } from "@/modules/dashboard/context/LoadPictosContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { PromptSchema } from "../schema/PromptSchema";
import { generatePrompt } from "../services/axios-IA";

export const usePropmt = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resError, setResError] = useState<string | undefined>();
  const [response, setResponse] = useState<string[]>([]);

  const loadPictosContext = use(LoadPictosContext);
  const { pictosLoaded, setPictosLoaded } = loadPictosContext!;

  const { token } = useAuthState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ action: string }>({ resolver: zodResolver(PromptSchema) });

  const onSubmit = handleSubmit(async ({ action }) => {
    try {
      setIsLoading(true);
      const res = await generatePrompt(action, token);
      res.words.forEach(async (element: string) => {
        const pictos = await getPicoByWord(element);
        setPictosLoaded((prev) => [...prev, pictos]);
      });

      console.log(res);
      if (res) {
        setIsLoading(false);
        setResponse(res);
      }
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      setResError(error);
    }
  });
  return {
    isLoading,
    resError,
    control,
    errors,
    response,

    setResponse,
    setResError,
    handleSubmit,
    onSubmit,
    setIsLoading,
  };
};
