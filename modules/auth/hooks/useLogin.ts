import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormDataLogin } from "../interfaces/Formdata.interface";
import { LoginSchema } from "../schema/form.schema";
import { login } from "../services/auth.axios";
import { useAuthState } from "../store/authState";

export const useLogin = () => {
  const { logIn } = useAuthState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resError, setResError] = useState<string | undefined>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const res = await login(data);
      if (res) {
        setIsLoading(false);
        router.replace("/profile");
      }

      logIn(res.name, res.lastName, res.email, res.roles, res.token);
    } catch (error: any) {
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
