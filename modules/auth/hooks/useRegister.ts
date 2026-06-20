import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { FormDataRegister } from "../interfaces/Formdata.interface";
import { RegisterSchema } from "../schema/form.schema";
import { register } from "../services/auth.axios";
import { useAuthState } from "../store/authState";

export const useRegister = () => {
  const { logIn } = useAuthState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataRegister>({ resolver: zodResolver(RegisterSchema) });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await register(data);

      if (res) {
        router.push("/profile");
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
