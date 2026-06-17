import { z } from "zod";

export const RegisterSchema = z.object({
  fullName: z
    .string({ message: "Ingresa un nombre válido" })
    .min(2, { message: "El nombre tiene que tener más de una letras" })
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, {
      message: "El nombre solo puede contener letras",
    }),

  lastName: z
    .string({ message: "Ingresa un apellido válido" })
    .min(2, { message: "El apellido tiene que tener más de una letras" })
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, {
      message: "El apellido solo puede contener letras",
    }),

  email: z.email({
    message: "Ingresa un email válido",
  }),

  password: z
    .string({ message: "Ingresa una contraseña válida" })
    .regex(/^(?=.*[A-Z]).{8,}$/, {
      message: "La contraseña debe tener al menos 8 caracteres y una mayúscula",
    }),
});

export const LoginSchema = z.object({
  email: z.email({
    message: "Ingresa un email válido",
  }),

  password: z
    .string({ message: "Ingresa una contraseña válida" })
    .regex(/^(?=.*[A-Z]).{8,}$/, {
      message: "La contraseña debe tener al menos 8 caracteres y una mayúscula",
    }),
});
