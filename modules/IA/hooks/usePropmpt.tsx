import { useAuthState } from "@/modules/auth/store/authState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PromptSchema } from "../schema/PromptSchema";
import { generatePrompt } from "../services/axios-IA";

export const usePropmt = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resError, setResError] = useState<string | undefined>();

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
      console.log(res);
      if (res) {
        setIsLoading(false);
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

    setResError,
    handleSubmit,
    onSubmit,
  };
};
