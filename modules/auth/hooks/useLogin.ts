import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { FormDataLogin } from "../interfaces/Formdata.interface";
import { LoginSchema } from "../schema/form.schema";
import { login } from "../services/auth.axios";
import { useAuthState } from "../store/authState";

export const useLogin = () => {
  const { logIn } = useAuthState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>({ resolver: zodResolver(LoginSchema) });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await login(data);

      if (res) {
        router.replace("/profile");
      }

      logIn(res.name, res.email, res.token, res.roles);
    } catch (error) {
      throw new Error(`${error}`);
    }
  });
  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
    router,
  };
};
