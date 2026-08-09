import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserRegister } from "../interfaces/User.interface";
import { RegisterSchema } from "../schema/form.schema";
import { register } from "../services/auth.service";
import { useAuthState } from "../store/authState";

export const useRegister = (roles: string[]) => {
  const { logIn } = useAuthState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resError, setResError] = useState<string | undefined>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>({ resolver: zodResolver(RegisterSchema) });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const res = await register({ ...data, roles });

      if (res) {
        setIsLoading(false);
        router.push("/profile");
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
