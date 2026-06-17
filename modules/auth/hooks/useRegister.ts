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
    const { lastName, ...registerData } = data; //Esto lo hago para probar con un backend real !!!!!!No es necesario

    try {
      const res = await register(registerData);

      if (res) {
        router.push("/profile");
      }

      logIn(res.fullName, res.email, res.token);
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
