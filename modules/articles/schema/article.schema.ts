import { z } from "zod";

export const ArticleSchema = z.object({
  title: z
    .string({ message: "Ingresa un nombre válido" })
    .min(2, { message: "El nombre tiene que tener más de dos letras" }),
  resume: z
    .string({ message: "Ingresa un texto válido" })
    .max(70, { message: "El resumen no debe tener más de 70 letras" }),
  body: z
    .string({ message: "Ingresa un texto válido" })
    .min(2, { message: "El texto debe tener más de 2 letras" })
    .max(200, { message: "El texto no debe tener más de 200 letrass" }),
});
